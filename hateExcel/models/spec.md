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
```
  models
    |-- mysql
    |-- tables
    |-- presentations
    `-- util

    router -> presentations -> tables -> mysql
           -> tables -> mysql
```

## いまの関数を整理してみるのはどうか（ボトムアップ式）

### private method 
- makeUserKey
- makeFenicsKey
- makeMobileFenicsKey
- makeFenicsKey
- makeMobileAdminPw
- makeNewFenicsIp
- makeNewFenicsId
- makeNewClientId
- makeFenicsAccount
- makeClient
- makeNewMobileFenicsId
- makeNewMobileFenicsIp
- makeMobileUser
- findNewDbPass
- findNewUserKey
- findNewKid
- findNewFenicsKey
- findNewMobileFenicsKey
- findLastBaseId
- getNextZeroPadData
// - findEnvironmentId
// - makeService
// - makeServer

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

### privateの整理

#### tableごとに必要なものにわけてみる
+ kids
+ customers
+ licenses
+ fenics
+ busivs
+ partners
+ mobiles
+ historys

- makeUserKey            -> kids
- makeFenicsKey          -> kids
- findNewDbPass          -> kids
- findNewUserKey         -> kids
- findNewKid             -> kids
- findLastBaseId         -> customers
- makeFenicsKey          -> fenics
- makeMobileFenicsKey    -> fenics
- makeNewFenicsIp        -> fenics
- makeNewFenicsId        -> fenics
- makeFenicsAccount      -> fenics
- makeNewMobileFenicsId  -> fenics
- makeNewMobileFenicsIp  -> fenics
- findNewFenicsKey       -> fenics
- makeNewClientId        -> client
- makeClient             -> client
- makeMobileUser         -> mobiles
- makeMobileAdminPw      -> mobile
- findNewMobileFenicsKey -> mobiles
- getNextZeroPadData     -> util

+ insert
+ delete
+ update
+ authenticate
+ makeLoginAccount -> logins
+ makeFenicsList   -> fenics
+ makeClientList   -> client
+ makeServiceList  -> services
+ makeServerList   -> servers
+ makeMobileList   -> mobiles
+ makeUser         -> kids
+ makeMemo         -> memos
+ getAddInfo       -> historys
+ getLicense       -> license

### privateはutilにまとめるのもメンテは楽だ

- utilsの中にtablesごとのをファイルをつくるか？
- find, make, getなどのメソッド系でわける。














