Ext.define('Consulting.view.main.nav.top.TopView', {
	extend: 'Ext.Toolbar',
	xtype: 'topview',
	cls: 'topview',
	shadow: false,
	items: [
		{
			xtype: 'container', 
			cls: 'topviewtext',
			bind: { 
				html: '{name}',
				hidden: '{navCollapsed}' 
			}
		},
		'->',
		{
			xtype: 'button',
			ui: 'topviewbutton',
			reference: 'navtoggle',
			handler: 'onTopViewNavToggle',
			iconCls: 'x-fa fa-navicon'
		}
	]
});