# サーバーサイド設計について

## 勝手な想定
router -> action -> DB
このやり方の場合の問題は、actionにDBアクセスのメソッドが含まれるので、
テストがやりにくいのだ。

## テストを考慮した設計について考えよう
router -> actionCreater -> action  
                        -> DB  

- routerは、必要なactionを呼ぶのみ
- actionは、actionCreaterに必要なパラメータ作成を依頼
- 返却されたパラメータでDBアクセス

この流れを見ると、actionCreaterはコントローラーの働きをしている。  
どのタイミング・順序で何を呼び出すのかを管理しているのだ。

こうすると、action部分だけのテストやDBアクセスだけのテストができる。  
actionCreaterは、業務の言葉で表現できるものだと言える。  
確か、presentation層というやつだ。

## 一つのクラス内にactionとactionCreaterを収めるかどうか？

もう少し具体的に進めていこうか。

1. router -> User.register -> User.something  
                           -> DB

2. router -> User.register -> Other.something  
                           -> DB

2の場合、Otherクラスがたくさん出来るイメージだな。  
User.registerなどのサービスメソッドが出来る度に、専用のパラメータ作成用の関数ができていく。専用パラメータ関数をどうまとめるのかが問題。  

1の場合、一つのクラスにパラメータ作成関数とサービス関数があるので、  
ファイルを横断しなくて済むけど、パラメータ作成関数をテストするためだけにpublicメソッドにする必要があり、  
これはこれで気持ち悪い。

## フォルダ構成をどうするか？


## いまの関数を整理してみるのはどうか（ボトムアップ式）

### private method
- makeUserKey
- makeFenicsKey
- makeMobileFenicsKey
- makeMobileAdminPw
- makeNewFenicsIp
- makeNewFenicsId
- makeNewClientId
- makeFenicsAccount
- makeClient
- makeService
- makeServer
- makeNewMobileFenicsId
- makeNewMobileFenicsIp
- makeMobileUser
- findNewDbPass
- findNewUserKey
- findNewKid
- findNewFenicsKey
- findNewMobileFenicsKey
- findEnvironmentId
- findLastBaseId
- getNextZeroPadData

### public method
+ insert
+ delete
+ update
+ authenticate
+ makeLoginAccount
+ makeFenicsList
+ makeClientList
+ makeServiceList
+ makeServerList
+ makeMobileList
+ makeUser
+ makeMemo
+ getAddInfo
+ getLicense














