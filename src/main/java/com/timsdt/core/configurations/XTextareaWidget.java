package com.timsdt.core.configurations;

import org.opencms.file.CmsObject;
import org.opencms.file.CmsResource;
import org.opencms.i18n.CmsMessages;
import org.opencms.main.OpenCms;
import org.opencms.widgets.*;
import org.opencms.xml.content.I_CmsXmlContentHandler;
import org.opencms.xml.types.A_CmsXmlContentValue;

import java.util.Collections;
import java.util.List;
import java.util.Locale;

public class XTextareaWidget extends A_CmsWidget implements I_CmsADEWidget {
    @Override
    public String getConfiguration(CmsObject cms, A_CmsXmlContentValue contentValue, CmsMessages messages, CmsResource resource, Locale contentLocale) {
        return getConfiguration();
    }

    @Override
    public List<String> getCssResourceLinks(CmsObject cms) {
        return null;
    }

    @Override
    public I_CmsXmlContentHandler.DisplayType getDefaultDisplayType() {
        return I_CmsXmlContentHandler.DisplayType.singleline;
    }

    @Override
    public String getInitCall() {
        return "initXTextWidget";
    }

    @Override
    public List<String> getJavaScriptResourceLinks(CmsObject cms) {
        return Collections.singletonList(OpenCms.getLinkManager().substituteLink(cms, "/system/modules/com.timsdt.core/resources/js/main.js"));
    }

    @Override
    public String getWidgetName() {
        return "XTextareaWidget";
    }

    @Override
    public boolean isInternal() {
        return false;
    }

    @Override
    public String getDialogWidget(CmsObject cms, I_CmsWidgetDialog widgetDialog, I_CmsWidgetParameter param) {
        return null;
    }

    @Override
    public I_CmsWidget newInstance() {
        return new XTextareaWidget();
    }
}
