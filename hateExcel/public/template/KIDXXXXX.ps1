. 'C:\Program Files\Citrix\XenApp Server SDK\Citrix.XenApp.Sdk.ps1'

Add-XAApplicationAccount "LifeMark-WINCARE Cloud"  -Accounts "2008-CloudLMAP\UsersFJMUSR"
Add-XAApplicationAccount "DB Manager"  -Accounts "2008-CloudLMAP\UsersFJMUSR"
Add-XAApplicationAccount "WINCAREタスクマネージャ"  -Accounts "2008-CloudLMAP\UsersFJMUSR"
Add-XAApplicationAccount "オンラインヘルプ"  -Accounts "2008-CloudLMAP\UsersFJMUSR"
Add-XAApplicationAccount "レセプトチェックツール"  -Accounts "2008-CloudLMAP\UsersFJMUSR"
Add-XAApplicationAccount "ﾚﾍﾞﾙｱｯﾌﾟ適用確認結果"  -Accounts "2008-CloudLMAP\UsersFJMUSR"
Add-XAApplicationAccount "初回接続ツール"  -Accounts "2008-CloudLMAP\UsersFJMUSR"
Add-XAApplicationAccount "振替請求システム"  -Accounts "2008-CloudLMAP\UsersFJMUSR"

Read-Host "続けるには Enter キーを押してください..." 