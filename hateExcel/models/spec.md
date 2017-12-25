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
User.registereメソッドが出来る度に、専用のパラメータ作成用の関数ができていく感じなので、まとめるのが大変。  

1の場合、一つのクラスにパラメータ作成関数とサービス関数があるので、  
ファイルを横断しなくて済むけど、パラメータ作成関数をテストするためだけにpublicメソッドにする必要があり、  
これはこれで気持ち悪い。












