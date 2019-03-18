/* SQL実行 */

/* ログインを固定サーバー ロールのメンバーとして追加します。
   EXEC sp_addsrvrolemember 'ユーザー識別子', 'sysadmin(固定)'; */

EXEC sp_addsrvrolemember 'u<%- userkey %>', 'sysadmin'; 
GO

/* サーバー レベルのロールのメンバーに関する情報を返します*/

EXEC sp_helpsrvrolemember 
Go

/* WINCARE_OPTIONにユーザー追加
   insert into [WINCARE_OPTION].[dbo].[SETUP_DSaaSユーザ情報] values ('ユーザー識別子','サービス','パスワード',50(固定),端末開始ID,'事業者名','KID番号') */

insert into [WINCARE_OPTION].[dbo].[SETUP_DSaaSユーザ情報] values ('<%- userkey %>','<%- license %>','<%- db_password %>',50,<%- start_id %>,'<%- customer_name %>','<%- kid %>') 

