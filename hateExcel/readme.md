# Client情報の更新について検討事項

- サーバー側で最新状態と比較したい
- クライアント側でサーバ側と変更があった場合、データの再取得をしてくれる

## 処理の流れ

**クライアント側**
以下をサーバに送信
- 新しいデータ
- 古いデータ

**サーバ側**
1. 古いデータをDB内と比較して差分チェックをする
2. もし差分が存在すれば、再取得するようにクライアントに依頼する
3. 

# トランザクションを利用した登録の流れについて

## 修正が必要なオブジェクトは何か？
**テーブル**
- [] kids - サーバー側で処理できる部分だ
- [x] customers
- [x] licenses
- [x] partners
- [x] mobiles
- [x] busivs
**追加項目**
- [] clients number
- [] fenics number

## サーバーにどんなデータを送れば良いのか？
{
  "kids" : {},
  "customers" : {},
  "licenses" : {},
  "partners" : {},
  "mobiles" : {},
  "busivs" : {},
  "client_number" : {},
  "fenics_number" : {}
}

## urlはどうするか？
post /user/               -> 新規ユーザー作成
put /user/55555           -> KID55555の登録
put /user/kids/555555     -> KID55555の更新
put /user/customers/55555 -> KID55555の更新
put /user/licenses/55555  -> KID55555の更新
put /user/partners/55555  -> KID55555の更新
put /user/mobiles/55555   -> KID55555の更新
put /user/busivs/55555    -> KID55555の更新


# KID付番をドコモ環境を考える
- 同じ環境IDの中でもっとも高い番号+1を与える
- もし同じ環境でひとつもIDが存在しないならば,初期値を与える

environmentテーブルをマスタ業務としてユーザーに触らせるようにするほうが
いいね。問題は、付番した値がかぶったときにどう処理するのかということ。
基本処理は問題ないと思うが


| id | system_type | version |  kid  |
|----|-------------|---------|-------|
|  1 | onpre       | ES      | 50000 |
|  2 | onpre       | LM      | 51000 |
|  3 | cloud       | ES      | 52000 |
|  4 | cloud       | LM      | 53000 |
|  5 | demo        | LM      | 54000 |
|  6 | docomo      | LM      | 55000 |

## 柔軟性を保ったままユーザー入力をどのようにすればよいのか？
id[1~4]については、system_typeとversionの複合主キーなのに、
id[5,6]については、system_typeのみで主キーになってる点が気持ち悪い。
- 常にsystem_type versionの両方からidを特定する
- system_type versionでoption DOMを作成して、両方をサーバに渡す。

## もし削除されており、一致するものがなかったときは?
 -> 削除されたことを明記する通知をする。

## デフォルト+1が他のKIDとかぶった時はどうする？
 -> KIDが重複して失敗という通知と管理者への連絡を促す。
 - 今の実装でさらに+1を見つけるかどうか？



