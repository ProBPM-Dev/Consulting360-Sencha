Ext.define('Consulting.view.personnel.PersonnelView',{
    extend: 'Ext.dataview.List',
    xtype: 'personnelview',
    cls: 'personnelview',
    controller: 'personnelviewcontroller',
    viewModel: {type: 'personnelviewmodel'},
    store: {type: 'personnelshared'},
    emptyText: 'No activity was found',
    striped: true,
    grouped: true,
    plugins: {
        listswiper: {
            defaults: {
                ui: 'action'
            },
            left: [{
                iconCls: 'x-fa fa-phone',
                text: 'Call',
                commit: 'onCall'
            }],
            right: [{
                iconCls: 'x-fa fa-envelope',
                ui: 'alt confirm',
                text: 'Message',
                commit: 'onMessage'
            }, {
                iconCls: 'x-fa fa-cog',
                text: 'Edit',
                commit: 'onEdit'
            }]
        }
    },
    itemTpl: new Ext.XTemplate(`
        <div class="testview" style="width: 100%;border: 0px solid green;">
            <table style="width: 100%;border: 0px solid green;" >
                <tr>
                    <td rowspan="2" width="90px">
                        <div class="picture" style="background-image: url(resources/shared/images/enterprise/{[this.removeSpaces(values.name)]}.jpg)"></div>
                    </td>
                    <td style="font-size: 16px;">
                        <div style="line-height: 20px;" class="xitem-title">{name}</div>
                        <div style="line-height: 20px;" class="xitem-caption">{email}</div>
                        <div style="line-height: 20px;" class="xitem-caption">{phone}</div>
                        <div style="line-height: 20px;" class="xitem-caption">{dept}</div>
                    </td>
                </tr>
            </table>
        </div>
    `,
    {
        removeSpaces:function(val){
            return val.replace(" ", "")
        }
    })
});

//By Source (WP:NFCC#4), Fair use, https://en.wikipedia.org/w/index.php?curid=35388368
//Fair use, https://en.wikipedia.org/w/index.php?curid=12540672
//Fair use, https://en.wikipedia.org/w/index.php?curid=12543302
//Fair use, https://en.wikipedia.org/w/index.php?curid=12543502
