(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{362:function(e,t,s){e.exports=s.p+"assets/img/downloading-git.dd7e4e12.png"},363:function(e,t,s){e.exports=s.p+"assets/img/downloading-svn.8594f3fd.png"},364:function(e,t,s){e.exports=s.p+"assets/img/running-loading.274ceb99.png"},365:function(e,t,s){e.exports=s.p+"assets/img/running-play.81956f55.png"},366:function(e,t,s){e.exports=s.p+"assets/img/running-control.cae06279.png"},367:function(e,t,s){e.exports=s.p+"assets/img/results-csv.0850c441.png"},384:function(e,t,s){"use strict";s.r(t);var a=s(44),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"getting-started"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getting-started"}},[e._v("#")]),e._v(" Getting started")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("p",[e._v("The minimal setup consists of:")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://unrealengine.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Unreal Engine 4"),a("OutboundLink")],1),e._v(", the project was made with version 4.26.1")]),e._v(" "),a("li",[e._v("A Subversion client, for Windows "),a("a",{attrs:{href:"https://tortoisesvn.net/",target:"_blank",rel:"noopener noreferrer"}},[e._v("TortoiseSVN"),a("OutboundLink")],1),e._v(" is recommended")]),e._v(" "),a("li",[e._v("A Git client, either "),a("a",{attrs:{href:"https://git-scm.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("the original"),a("OutboundLink")],1),e._v(", or one of many GUI alternatives")]),e._v(" "),a("li",[a("a",{attrs:{href:"https://python.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Python 3"),a("OutboundLink")],1),e._v(" and/or "),a("a",{attrs:{href:"https://mathworks.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("MATLAB"),a("OutboundLink")],1),e._v(" 2021a and newer")])]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("The following instructions assume you are using Windows with Git and SVN clients recommended above and Python 3. All of them installed with default settings as of writing this guide. Otherwise consult appropriate manuals.")])]),e._v(" "),a("h2",{attrs:{id:"downloading-the-applications"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#downloading-the-applications"}},[e._v("#")]),e._v(" Downloading the applications")]),e._v(" "),a("p",[e._v("Navigate to the folder where you want to store the project, open context menu (right click) and select "),a("code",[e._v("Git Bash Here")]),e._v(". Type the following command and confirm with Enter (Shift+Insert can be used to paste).")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("git")]),e._v(" clone https://github.com/wut-daas/uav-assess-vr.git\n")])])]),a("p",[e._v("Wait until the next command prompt appears (a "),a("code",[e._v("$")]),e._v(" followed by blinking cursor) and close this window.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(362),alt:"Git Bash window"}})]),e._v(" "),a("p",[e._v("Once again open context menu in the folder you wish to store the project, but this time select "),a("code",[e._v("SVN Checkout...")]),e._v(". Paste the following URL into "),a("code",[e._v("URL of Repository")]),e._v(" field. Before you click "),a("code",[e._v("OK")]),e._v(", you might want to change the value of the "),a("code",[e._v("Checkout directory:")]),e._v(" to prevent a conflict with the git folder")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("http://server803160.nazwa.pl/svn/uav-assess-vr/trunk\n")])])]),a("p",[a("img",{attrs:{src:s(363),alt:"TortoiseSVN window"}})]),e._v(" "),a("h2",{attrs:{id:"running-a-test"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#running-a-test"}},[e._v("#")]),e._v(" Running a test")]),e._v(" "),a("p",[e._v("Navigate to the directory where you checked out the SVN repository, then "),a("code",[e._v("UAVAssessVR")]),e._v(" subdirectory. Open "),a("code",[e._v("UAVAssessVR.uproject")]),e._v(" file located there. Please note that it may take a while before Unreal Engine shows the loading window.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(364),alt:"Unreal loading"}})]),e._v(" "),a("p",[e._v("Navigate to the directory where you cloned the Git repository, then "),a("code",[e._v("external-assessment")]),e._v(" subdirectory. Holding Shift, right click and select "),a("code",[e._v("Open PowerShell here")]),e._v(". Type the following command and confirm with Enter (Ctrl+V or Shift+Insert can be used to paste). Keep this process running during whenever you want to get live assessment.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("python assessment-server.py\n")])])]),a("hr"),e._v(" "),a("p",[e._v("Once the Unreal project is loaded, using "),a("code",[e._v("Content Browser")]),e._v(" in the bottom section of the screen, open folder "),a("code",[e._v("Maps")]),e._v(" and then open level "),a("code",[e._v("BasicFlight")]),e._v(". Click the "),a("code",[e._v("Play")]),e._v(" button in the top bar, and then click inside the viewport.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(365),alt:"Starting the test"}})]),e._v(" "),a("p",[e._v("Press C key, a "),a("code",[e._v("Simulating locally")]),e._v(" indicator should appear in the bottom left corner of the screen. With that it is now possible to control the UAV with WASD and arrow keys. Ignore the "),a("code",[e._v("No MAVLink connection")]),e._v(" indicator.")]),e._v(" "),a("p",[e._v("Fly through the start gate (green). A progress bar should appear that gets filled less as the UAV moves away from the series of blue arrows, and grow when the distance between UAV and the trail gets smaller. Fly the UAV through all checkpoint gates (blue) and the finish gate (red). A "),a("code",[e._v("Saving...")]),e._v(" indicator should briefly appear when you are finishing the run.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(366),alt:"Controlling the UAv"}})]),e._v(" "),a("h2",{attrs:{id:"getting-the-results"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getting-the-results"}},[e._v("#")]),e._v(" Getting the results")]),e._v(" "),a("p",[e._v("Navigate to the Unreal project directory (where the "),a("code",[e._v("UAVAssessVR.uproject")]),e._v(" file is located), then into "),a("code",[e._v("Saved")]),e._v(" and "),a("code",[e._v("FlightLogs")]),e._v(" subdirectories. Data is saved to "),a("code",[e._v(".csv")]),e._v(" files with fields separated with comma ("),a("code",[e._v(",")]),e._v("), decimal place is period ("),a("code",[e._v(".")]),e._v(") and text strings except datetime are encased with double quotes ("),a("code",[e._v('"')]),e._v("). The filenames follow this format:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("{date YYYYMMDD}T{hour HHMMSS}_{operator name}_{level name}.csv\n")])])]),a("p",[e._v("The units used are seconds, meters, meters per second and degrees. Depending on the assessment function used during the attempt, there may be multiple columns with score. The first score should always be overall operator performance between 0 and 1 - this is the value displayed during the simulation using operator performance indicator.")]),e._v(" "),a("p",[a("img",{attrs:{src:s(367),alt:"Example data"}})])])}),[],!1,null,null,null);t.default=n.exports}}]);