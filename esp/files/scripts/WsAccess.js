/*##############################################################################
#    HPCC SYSTEMS software Copyright (C) 2012 HPCC Systems.
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.
############################################################################## */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/store/Observable",

    "hpcc/ESPRequest"
], function (declare, lang, Observable,
    ESPRequest) {

    var UsersStore = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "Users",
            responseQualifier: "UserResponse.Users.User",
            idProperty: "username",
    });

    var GroupsStore = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "Groups",
            responseQualifier: "GroupResponse.Groups.Group",
            idProperty: "name",
    });

    var AccountPermissions = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "AccountPermissions",
            responseQualifier: "AccountPermissionsResponse.ResourceName.PermissionName",
            idProperty: "PermissionName",
    });

     // Store for Permissions ->
    var Permissions = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "Permissions",
            responseQualifier: "BasednsResponse.Basedns.Basedn",
            idProperty: "name",
    });

    // Store for Operation List  Permissions->Resources->
    var OperationPermissions = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "Resources",
            responseQualifier: "ResourcesResponse.Resources.Resource",
            idProperty: "name",
    });

     var ResourcePermissions = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "ResourcePermissions",
            responseQualifier: "ResourcePermissionsResponse.Permissions.Permission",
            idProperty: "account_name",
    });

    var CreateMemberOfStore = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "Groups",
            responseQualifier: "GroupResponse.Groups.Group",
            idProperty: "name",
    });

    var CreateUserMemberOfStore = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "UserEdit",
            responseQualifier: "UserEditResponse.Groups.Group",
            idProperty: "name",
    });

    var UserGroupEditInputStore = declare([ESPRequest.Store], {
            service: "ws_access",
            action: "Permissions",
            responseQualifier: "UserGroupEditInputResponse.Groups.Group",
            idProperty: "name",
    });

    return {
        Users: function (params) {
            return ESPRequest.send("ws_access", "Users", params);
        },

        UserAction: function (params) {
            return ESPRequest.send("ws_access", "UserAction", params);
        },

        AddUser: function (params) {
            return ESPRequest.send("ws_access", "AddUser", params);
        },

        UserEdit: function (params) {
            return ESPRequest.send("ws_access", "UserEdit", params);
        },

        UserInfoEditInput: function (params) {
            return ESPRequest.send("ws_access", "UserInfoEditInput", params);
        },

        UserInfoEdit: function (params) {
            return ESPRequest.send("ws_access", "UserInfoEdit", params);
        },

        UserResetPassInput: function (params) {
            return ESPRequest.send("ws_access", "UserResetPassInput", params);
        },

        UserResetPass: function (params) {
            return ESPRequest.send("ws_access", "UserResetPass", params);
        },

        UserGroupEdit: function (params) {
            return ESPRequest.send("ws_access", "UserGroupEdit", params);
        },

        AccountPermissions: function (params) {
            return ESPRequest.send("ws_access", "AccountPermissions", params);
        },

        ResourcePermissions: function (params) {
            return ESPRequest.send("ws_access", "ResourcePermissions", params);
        },

        UserGroupEditInput: function (params) {
            return ESPRequest.send("ws_access", "UserGroupEditInput", params);
        },

        UpdatePermission: function (account_name, params) {
            lang.mixin(params.request, {
                action: "update",
                rtype: params.request.RType,
                rtitle: params.request.ResourceName,
                rname: params.request.PermissionName,
                account_name:  account_name,
                account_type:  0
            });
            return ESPRequest.send("ws_access", "PermissionAction", params);
        },

        UpdateIndividualPermission: function (account_name, params) {
            lang.mixin(params.request, {
                action: "update",
                rtype: params.request.RType,
                rtitle: params.request.ResourceName,
                rname: params.request.PermissionName,
                account_name:  account_name,
                account_type:  0
            });
            return ESPRequest.send("ws_access", "PermissionAction", params);
        },

        CreateUsersStore: function (options) {
            var store = new UsersStore(options);
            return Observable(store);
        },

        CreateUserMemberOfStore: function (options) {
            var store = new CreateUserMemberOfStore(options);
            return Observable(store);
        },

        GroupsStore: function (options) {
            var store = new GroupsStore(options);
            return Observable(store);
        },

        UserGroupEditInputStore: function (options) {
            var store = new UserGroupEditInputStore(options);
            return Observable(store);
        },

        MemberOfStore: function (options) {
            var store = new MemberOfStore(options);
            return Observable(store);
        },

        Permissions: function (options) {
            var store = new Permissions(options);
            return Observable(store);
        },

        OperationPermissions: function (options) {
            var store = new OperationPermissions(options);
            return Observable(store);
        },

        ResourcePermissions: function (options) {
            var store = new ResourcePermissions(options);
            return Observable(store);
        },
    };
});

