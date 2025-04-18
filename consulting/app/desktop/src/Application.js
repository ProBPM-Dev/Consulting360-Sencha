Ext.define('Consulting.Application', {
	extend: 'Ext.app.Application',
	name: 'Consulting',
	requires: ['Consulting.*'],
	defaultToken: 'homeview',

	removeSplash: function () {
		Ext.getBody().removeCls('launching')
		var elem = document.getElementById("splash")
		elem.parentNode.removeChild(elem)
	},

	launch: function () {
		this.removeSplash()
		var whichView = 'mainview'
		Ext.Viewport.add([{xtype: whichView}])
	
			// Load store only once on application start
			Ext.create('Consulting.desktop.src.store.CompanyHolidays');
			Ext.create('Consulting.desktop.src.store.POTitle');
		
	},

	onAppUpdate: function () {
		Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
			function (choice) {
				if (choice === 'yes') {
					window.location.reload();
				}
			}
		);
	}
});
