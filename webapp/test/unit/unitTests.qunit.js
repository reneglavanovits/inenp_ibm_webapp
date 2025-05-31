/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"athochschuleburgenland/inenp_ibm/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
