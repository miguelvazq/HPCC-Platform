/*##############################################################################

    HPCC SYSTEMS software Copyright (C) 2015 HPCC Systems.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
############################################################################## */

#include "jiface.hpp"
#include "componentstatus.hpp"
#include "jlib.hpp"
#include "esp.hpp"
#include "ws_machine_esp.ipp"
#include "ws_machine.hpp"

static MapStringTo<int> componentTypeMap;
static MapStringTo<int> componentStatusTypeMap;
static unsigned componentTypeIDCount;

class CESPComponentStatusInfo : public CInterface, implements IESPComponentStatusInfo
{
    StringAttr reporter;
    StringAttr timeCached;
    IArrayOf<IEspComponentStatus> statusList;

    bool addToCache; //this CESPComponentStatusInfo object is created by ws_machine.UpdateComponentStatus
    int componentStatusID; //the worst component status in the system
    int componentTypeID; //the worst component status in the system
    StringAttr componentType; //the worst component status in the system
    StringAttr endPoint; //the worst component status in the system
    StringAttr componentStatus; //the worst component status in the system
    StringAttr timeReportedStr; //the worst component status in the system
    __int64 timeReported; //the worst component status in the system
    Owned<IEspStatusReport> componentStatusReport; //the worst component status in the system

    void formatTimeStamp(time_t tNow, StringAttr& out)
    {
        char timeStr[32];
#ifdef _WIN32
        struct tm *ltNow;
        ltNow = localtime(&tNow);
        strftime(timeStr, 32, "%Y-%m-%d %H:%M:%S", ltNow);
#else
        struct tm ltNow;
        localtime_r(&tNow, &ltNow);
        strftime(timeStr, 32, "%Y-%m-%d %H:%M:%S", &ltNow);
#endif
        out.set(timeStr);
    }
    bool isSameComponent(const char* ep, int componentTypeID, IConstComponentStatus& status)
    {
        const char* ep1 = status.getEndPoint();
        if (!ep1 || !*ep1 || !ep || !*ep)
            return false;
        bool hasPort = strchr(ep, ':');
        if (hasPort)
            return streq(ep1, ep);
        //If no port, report one componentType per IP
        return ((componentTypeID == status.getComponentTypeID()) && streq(ep1, ep));
    }
    void addStatusReport(const char* reporterIn, const char* timeCachedIn, IConstComponentStatus& csIn, IEspComponentStatus& csOut)
    {
        IArrayOf<IConstStatusReport>& statusReports = csOut.getStatusReports();
        IArrayOf<IConstStatusReport>& reportsIn = csIn.getStatusReports();
        ForEachItemIn(i, reportsIn)
        {
            IConstStatusReport& report = reportsIn.item(i);
            const char* status = report.getStatus();
            if (!status || !*status)
                continue;

            int statusID;
            if (addToCache)
                statusID = queryComponentStatusID(status);
            else
                statusID = report.getStatusID();

            Owned<IEspStatusReport> statusReport = createStatusReport();
            statusReport->setStatusID(statusID);
            statusReport->setStatus(status);

            const char* details = report.getStatusDetails();
            if (details && *details)
                statusReport->setStatusDetails(details);

            const char* url = report.getURL();
            if (url && *url)
                statusReport->setURL(url);

            statusReport->setReporter(reporterIn);
            statusReport->setTimeCached(timeCachedIn);
            statusReport->setTimeReported(report.getTimeReported());

            if (!addToCache)
            {//We need to add more info for a user-friendly output
                StringAttr timeStr;
                time_t seconds = report.getTimeReported();
                formatTimeStamp(seconds, timeStr);
                statusReport->setTimeReportedStr(timeStr.get());

                if (statusID > csOut.getStatusID()) //worst case
                {
                    csOut.setStatusID(statusID);
                    csOut.setStatus(status);
                    csOut.setTimeReportedStr(timeStr.get());
                    csOut.setReporter(reporterIn);
                }
                if (statusID > componentStatusID) //worst case
                {
                    componentTypeID = csIn.getComponentTypeID();
                    componentType.set(csIn.getComponentType());
                    endPoint.set(csIn.getEndPoint());
                    componentStatus.set(status);
                    componentStatusID = statusID;
                    timeReported = report.getTimeReported();
                    timeReportedStr.set(timeStr.get());
                    componentStatusReport.setown(statusReport.getLink());
                    reporter.set(reporterIn);
                }
            }
            statusReports.append(*statusReport.getClear());
        }
    }
    void addComponentStatus(const char* reporterIn, const char* timeCachedIn, IConstComponentStatus& st)
    {
        Owned<IEspComponentStatus> cs = createComponentStatus();
        cs->setEndPoint(st.getEndPoint());
        cs->setComponentType(st.getComponentType());
        if (addToCache)
            cs->setComponentTypeID(queryComponentTypeID(st.getComponentType()));

        IArrayOf<IConstStatusReport> statusReports;
        cs->setStatusReports(statusReports);

        addStatusReport(reporterIn, timeCachedIn, st, *cs);
        statusList.append(*cs.getClear());
    }
    void appendUnchangedComponentStatus(IEspComponentStatus& statusOld)
    {
        bool componentFound = false;
        const char* ep = statusOld.getEndPoint();
        int componentTypeID = statusOld.getComponentTypeID();
        ForEachItemIn(i, statusList)
        {
            if (isSameComponent(ep, componentTypeID, statusList.item(i)))
            {
                componentFound =  true;
                break;
            }
        }
        if (!componentFound)
            addComponentStatus(reporter.get(), timeCached, statusOld);
    }
public:
    IMPLEMENT_IINTERFACE;

    CESPComponentStatusInfo(const char* _reporter)
    {
        componentStatusID = -1;
        addToCache = _reporter? true : false;
        if (_reporter && *_reporter)
            reporter.set(_reporter);
    };

    virtual const char* getReporter() { return reporter.get(); };
    virtual const char* getTimeCached() { return timeCached.get(); };
    virtual int getComponentStatusID() { return componentStatusID; };
    virtual const char* getComponentStatus() { return componentStatus.get(); };
    virtual const char* getTimeReportedStr() { return timeReportedStr.get(); };
    virtual __int64 getTimeReported() { return timeReported; };
    virtual const int getComponentTypeID() { return componentTypeID; };
    virtual const char* getComponentType() { return componentType.get(); };
    virtual const char* getEndPoint() { return endPoint.get(); };
    virtual IEspStatusReport* getStatusReport() { return componentStatusReport; };
    virtual IArrayOf<IEspComponentStatus>& getComponentStatusList() { return statusList; };

    static void initStatusMap(IPropertyTree* cfg)
    {
        StringArray statusTypeMap;
        Owned<IPropertyTreeIterator> statusTypes = cfg->getElements("StatusType");
        ForEach(*statusTypes)
        {
            IPropertyTree& statusType = statusTypes->query();
            const char* name = statusType.queryProp("@name");
            if (name && *name)
                componentStatusTypeMap.setValue(name, statusType.getPropInt("@id"));
        }

        if (componentStatusTypeMap.count() < 1)
        {
            componentStatusTypeMap.setValue("normal", 1);
            componentStatusTypeMap.setValue("Normal", 1);
            componentStatusTypeMap.setValue("warning", 2);
            componentStatusTypeMap.setValue("Warning", 2);
            componentStatusTypeMap.setValue("error", 3);
            componentStatusTypeMap.setValue("Error", 3);
        }
        componentTypeIDCount = 0;
    }
    int queryComponentTypeID(const char *key)
    {
        int* id = componentTypeMap.getValue(key);
        if (id)
            return *id;

        componentTypeMap.setValue(key, ++componentTypeIDCount);
        return componentTypeIDCount;
    }
    int queryComponentStatusID(const char *key)
    {
        int* value = componentStatusTypeMap.getValue(key);
        if (!value)
            return 0;
        return *value;
    }

    virtual void mergeComponentStatusInfoFromReports(IESPComponentStatusInfo& statusInfo)
    {
        const char* reporterIn = statusInfo.getReporter();
        const char* timeCachedIn = statusInfo.getTimeCached();
        IArrayOf<IEspComponentStatus>& statusListIn = statusInfo.getComponentStatusList();
        ForEachItemIn(i, statusListIn)
        {
            IEspComponentStatus& statusIn = statusListIn.item(i);

            bool newCompoment = true;
            const char* ep = statusIn.getEndPoint();
            int componentTypeID = statusIn.getComponentTypeID();
            ForEachItemIn(ii, statusList)
            {
                IEspComponentStatus& statusOut = statusList.item(ii);
                if (isSameComponent(ep, componentTypeID, statusOut))
                {
                    addStatusReport(reporterIn, timeCachedIn, statusIn, statusOut);
                    newCompoment =  false;
                    break;
                }
            }
            if (newCompoment)
                addComponentStatus(reporterIn, timeCachedIn, statusIn);
        }
    }
    virtual void setComponentStatus(IArrayOf<IConstComponentStatus>& statusListIn)
    {
        time_t tNow;
        time(&tNow);
        formatTimeStamp(tNow, timeCached);

        statusList.kill();
        ForEachItemIn(i, statusListIn)
            addComponentStatus(reporter, timeCached, statusListIn.item(i));
    }
    void mergeCachedComponentStatus(IESPComponentStatusInfo& statusInfo)
    {
        IArrayOf<IEspComponentStatus>& csList = statusInfo.getComponentStatusList();
        ForEachItemIn(i, csList)
            appendUnchangedComponentStatus(csList.item(i));
    }
};

static CriticalSection componentStatusSect;

class CComponentStatusFactory : public CInterface, implements IComponentStatusFactory
{
    IArrayOf<IESPComponentStatusInfo> cache; //multiple caches from different reporter
public:
    IMPLEMENT_IINTERFACE;

    CComponentStatusFactory() { };

    virtual ~CComponentStatusFactory()
    {
        cache.kill();
    };

    virtual void initStatusMap(IPropertyTree* cfg)
    {
        CESPComponentStatusInfo::initStatusMap(cfg);
    };

    virtual IESPComponentStatusInfo* getComponentStatus()
    {
        CriticalBlock block(componentStatusSect);

        Owned<IESPComponentStatusInfo> status = new CESPComponentStatusInfo(NULL);
        ForEachItemIn(i, cache)
        {
            IESPComponentStatusInfo& item = cache.item(i);
            status->mergeComponentStatusInfoFromReports(item);
        }
        return status.getClear();
    }

    virtual void updateComponentStatus(const char* reporter, IArrayOf<IConstComponentStatus>& statusList)
    {
        CriticalBlock block(componentStatusSect);

        Owned<IESPComponentStatusInfo> status = new CESPComponentStatusInfo(reporter);
        status->setComponentStatus(statusList);

        ForEachItemIn(i, cache)
        {
            IESPComponentStatusInfo& cachedStatus = cache.item(i);
            if (strieq(reporter, cachedStatus.getReporter()))
            {
                status->mergeCachedComponentStatus(cachedStatus);
                cache.remove(i);
                break;
            }
        }
        cache.append(*status.getClear());
    }
};

static CComponentStatusFactory *csFactory = NULL;

static CriticalSection getComponentStatusSect;

extern COMPONENTSTATUS_API IComponentStatusFactory* getComponentStatusFactory()
{
    CriticalBlock block(getComponentStatusSect);

    if (!csFactory)
        csFactory = new CComponentStatusFactory();

    return LINK(csFactory);
}
