/*##############################################################################
#    Copyright (C) 2011 HPCC Systems.
#
#    All rights reserved. This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
############################################################################## */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/xhr",
	"dojo/_base/Deferred",
	"dojo/date",
	"dojo/date/stamp",
	"dojo/store/util/QueryResults",
	"hpcc/WsWorkunits",
	"hpcc/WsTopology",
	"hpcc/WsDfu",
	"hpcc/WsFileSpray",
	"hpcc/DFUQueryStore",
	"hpcc/ESPBase"

], function (declare, lang, xhr, Deferred, date, stamp, QueryResults, WsWorkunits, WsTopology, WsDfu, WsFileSpray, DFUQueryStore, ESPBase) {
	return declare(ESPBase, {
		dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], 
		monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],

		root: {
			type: "root",
			id: "root",
			name: "The Hidden Root",
			children: [
				{
					type: "folder",
					id: "targets",
					name: "Targets",
					children: true
				},
				{
					type: "folder",
					id: "dropZones",
					name: "Drop Zones",
					children: true
				},
				{
					type: "folder",
					id: "eclWorkunitsRoot",
					name: "Workunits",
					filter: {},
					children: true
				},
				{
					type: "folder",
					id: "dfuWorkunits",
					name: "File Sprays",
					filter: {},
					children: true
				},
				{
					type: "logicalFileFolder",
					id: "logicalFiles",
					filter: {},
					name: "Files",
					filter: {},
					children: true
				}
			]
		},

		constructor: function (args) {
			declare.safeMixin(this, args);
			this.initWorkunitsFolder(this.root.children[2]);
		}, 

		initWorkunitsFolder: function(workunitsRoot) {
			var _now = new Date();
			var year = _now.getUTCFullYear();
			var month = _now.getUTCMonth(); 
			var day = _now.getUTCDate(); 
			var dayOfWeek = _now.getUTCDay(); 
			workunitsRoot.children = [];
			for (var i = 0; i <= dayOfWeek; ++i) {
				workunitsRoot.children.push({
					type: "folder",
					id: "eclWorkunits",
					name: i == 0 ? "Today" : this.dayNames[dayOfWeek - i],
					filter: lang.mixin({
						StartDate: stamp.toISOString(new Date(year, month, day - i)),
						EndDate: stamp.toISOString(new Date(year, month, day - i + 1))
					}, workunitsRoot.filter),
					children: true
				});
			}
			for (var i = month; i >= 0; --i) {
				workunitsRoot.children.push({
					type: "folder",
					id: "eclWorkunits",
					name: this.monthNames[i],
					filter: lang.mixin({
						StartDate: stamp.toISOString(new Date(year, i, 0)),
						EndDate: stamp.toISOString(new Date(year, i + 1, 0))
					}, workunitsRoot.filter),
					children: true
				});
			}
			for (var i = year - 1; i >= 2010; --i) {
				workunitsRoot.children.push({
					type: "folder",
					id: "eclWorkunits",
					name: i,
					filter: lang.mixin({
						StartDate: stamp.toISOString(new Date(i, 0, 0)),
						EndDate: stamp.toISOString(new Date(i + 1, 0, 0))
					}, workunitsRoot.filter),
					children: true
				});
			}
		},

		getIdentity: function (object) {
			return object.id;
		},

		mayHaveChildren: function (object) {
			// see if it has a children property 
			return "children" in object;
		},

		getChildren: function (object, onComplete, onError) {
			// retrieve the full copy of the object 
			this.get(object).then(function (fullObject) {
				// copy to the original object so it has the children array as well. 
				object.children = fullObject.children;
				// now that full object, we should have an array of children 
				onComplete(fullObject.children);
			}, function (error) {
				// an error occurred, log it, and indicate no children 
				console.error(error);
				onComplete([]);
			});
		},

		getRoot: function (onItem, onError) {
			this.get(this.root).then(onItem, onError);
		},

		getLabel: function (object) {
			return object.name;
		},

		getECLWorkunits: function (object, deferredResults) {
			var wuQueryStore = new WsWorkunits.WUQuery();
			var wuQueryStoreQuery = wuQueryStore.query(null, {
				query: object.filter
			});
			Deferred.when(wuQueryStoreQuery, function (workunits) {
				var result = lang.mixin({
					children: []
				}, object);
				if (result.children == true)
					result.children = [];
				for (var i = 0; i < workunits.length; ++i) {
					result.children.push({
						type: "ECLWorkunit",
						id: workunits[i].Wuid,
						name: workunits[i].Jobname ? workunits[i].Jobname + " (" + workunits[i].Wuid + ")" : workunits[i].Wuid,
						data: workunits[i]
					});
				}
				deferredResults.resolve(result);
			});
		},

		getDFUWorkunits: function(object, deferredResults) {
			var getDFUWorkunits = new WsFileSpray.GetDFUWorkunits();
			var getDFUWorkunitsQuery = getDFUWorkunits.query(null, {
				start: 0,
				count: 5,
				query: object.filter
			})
			Deferred.when(getDFUWorkunitsQuery, function (workunits) {
				var result = {
					children: []
				};
				for (var i = 0; i < workunits.length; ++i) {
					result.children.push({
						type: "DFUWorkunit",
						id: workunits[i].ID,
						name: workunits[i].ID,
						data: workunits[i]
					});
				}
				deferredResults.resolve(result);
			});
		},

		getTargets: function (deferredResults) {
			var request = {};
			request['PageStartFrom'] = 0;
			request['PageSize'] = 5;
			request['rawxml_'] = "1";

			var context = this;
			var results = xhr.get({
				url: this.getBaseURL("WsTopology") + "/TpTargetClusterQuery",
				handleAs: "xml",
				content: request,
				load: function (domXml) {
					var result = {
						children: []
					};
					var items = context.getValues(domXml, "TpTargetCluster");
					for (var i = 0; i < items.length; ++i) {
						var targetNode = {
							type: "TpTargetCluster",
							id: items[i].Name,
							name: items[i].Name,
							children: [ 				
								{
									type: "folder",
									id: "eclWorkunitsRoot",
									name: "Workunits",
									filter: {
										Cluster: items[i].Name
									},
									children: true
								}, 
								{
									type: "folder",
									id: "dfuWorkunits",
									name: "File Sprays",
									filter: {
										Cluster: items[i].Name
									},
									children: true
								}
							],
							data: items[i]
						};
						context.initWorkunitsFolder(targetNode.children[0]);
						result.children.push(targetNode);
					}

					deferredResults.resolve(result);
				}
			});
		},

		getDropZones: function(object, deferredResults){
			var TpServiceQueryStore = new WsTopology.TpServiceQuery();
			var TpServiceQuery = TpServiceQueryStore.query(null, {
			})
			Deferred.when(TpServiceQuery, function (dropzones) {
				var result = {
					children: []
				};
				for (var i = 0; i < dropzones.length; ++i) {
					result.children.push({
						type: "dropZone",
						id: dropzones[i].Name,
						name: dropzones[i].Name,
						filter: {
						   Netaddr: dropzones[i].TpMachines[0].Netaddress,
						   Path: dropzones[i].TpMachines[0].Directory,
						   OS: dropzones[i].TpMachines[0].OS
						},
						children: true,
						data: dropzones[i]
					});
				}
				deferredResults.resolve(result);
			});
		},

		getDropZoneFiles: function(object, deferredResults){
			var FileListStore = new WsFileSpray.FileList();
			var FileListQuery = FileListStore.query(null, {
				query: object.filter
			});
			Deferred.when(FileListQuery, function (files) {
				var result = {
					children: []
				};
				for (var i = 0; i < files.length; ++i) {
					result.children.push({
						type: "dropZoneFile",
						id: files[i].name,
						name: files[i].name,
						data: files[i]
					});
				}
				deferredResults.resolve(result);
			});
		},

		getLogicalFiles: function (object, deferredResults) {
			var prefix = object.filter.Prefix ? object.filter.Prefix : "";
			var dfuFilesStore = new WsDfu.DFUFileView();
			var dfuFilesStoreQuery = dfuFilesStore.query(null, {
				query: {
					Scope: prefix
				}
			});
			Deferred.when(dfuFilesStoreQuery, function (files) {
				var result = {
					children: []
				};
				for (var i = 0; i < files.length; ++i) {
					if (files[i].isDirectory && files[i].isDirectory == "1") {
						result.children.push({
							type: "logicalFileFolder",
							id: files[i].Directory,
							filter: {
								Prefix: (prefix ? prefix + "::" : "") + files[i].Directory,
							},
							name: files[i].Directory,
							children: true,
							data: files[i]
						});
					}
				}
				for (var i = 0; i < files.length; ++i) {
					if (!files[i].isDirectory || files[i].isDirectory != "1") {
						result.children.push({
							type: "logicalFile",
							id: files[i].Name,
							name: files[i].Name.substr(prefix.length + 2),
							data: files[i]
						});
					}
				}

				deferredResults.resolve(result);				
			});
		},

		get: function (object) {
			var deferredResults = new Deferred();

			if (object.type == "folder" && object.id == "targets") {
				this.getTargets(deferredResults);
			} else if (object.type == "folder" && object.id == "dropZones") {
				this.getDropZones(object, deferredResults);
			} else if (object.type == "dropZone") {
				this.getDropZoneFiles(object, deferredResults);
			} else if (object.type == "folder" && object.id == "eclWorkunits") {
				this.getECLWorkunits(object, deferredResults);
			} else if (object.type == "folder" && object.id == "dfuWorkunits") {
				this.getDFUWorkunits(object, deferredResults);
			} else if (object.type == "logicalFileFolder") {
				this.getLogicalFiles(object, deferredResults);
			} else {
				deferredResults.resolve(object);
			}

			var retVal = lang.mixin({
				total: Deferred.when(deferredResults, function (rows) {
					return rows.length ? rows.length : 0;
				})
			}, deferredResults);
			return QueryResults(retVal);
		}
	});
});
