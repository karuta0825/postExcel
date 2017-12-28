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

router
models
  |-- tables
  |     |-- Kids
  |     |-- Customers
  |     |-- Licenses
  `-- util
  こうすると、table配下のプライベートメソッドのテストができない。

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
  - makeMobileFenicsKey
  - makeMobileAdminPw
  - findNewMobileFenicsKey
+ historys

- makeUserKey -> kid
- makeFenicsKey -> fenics
- makeMobileFenicsKey -> fenics
- makeFenicsKey -> kid
- makeMobileAdminPw -> mobile
- makeNewFenicsIp -> fenics
- makeNewFenicsId -> fenics
- makeNewClientId -> client
- makeFenicsAccount -> fenics
- makeClient -> client
// - makeService
// - makeServer
- makeNewMobileFenicsId -> fenics
- makeNewMobileFenicsIp -> fenics
- makeMobileUser -> mobiles
- findNewDbPass -> kids
- findNewUserKey -> kids
- findNewKid -> kids
- findNewFenicsKey -> fenics
- findNewMobileFenicsKey
// - findEnvironmentId
- findLastBaseId -> customers
- getNextZeroPadData -> util

#### 呼び出し順序の確認
- makeMobileAdminPw
  <- makeBase

- makeFenicsAccount
  - makeNewFenicsIp
  - makeNewFenicsId
    - getNextZeroPadData
  <- makeFenicsList

- makeClient
  - makeNewClientId
    - getNextZeroPadData
  <- makeClientList

- makeMobileUser
  - makeNewMobileFenicsId
    - getNextZeroPadData
  - makeNewMobileFenicsIp

- findNewDbPass
  <- makeUser

- findNewUserKey
  - makeUserKey

- findNewKid

- findNewFenicsKey
  - makeFenicsKey
  <- makeUser

- findNewMobileFenicsKey
  - makeMobileFenicsKey
    - makeFenicsKey

// - findEnvironmentId
- findLastBaseId
  <- makeBase

//- makeService
//- makeServer














