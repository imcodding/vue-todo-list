
### 패키지 잠금 파일은 왜 생기는 것인가 ⁉
이번 프로젝트를 진행할 떄, 맥북과 윈도우 데스크탑에서 git을 통해서 작업을 진행했다.  
환경이 다른 곳에서 pull을 하고, npm install 을 진행하니 package-lock.json 파일과 yarn.lock 파일이 생성되었다.    
이 파일들의 역할이 무엇인지 알아보니, **패키지 버전 정보를 관리하기 위한 파일이었다.**  
자세하게 알기 위해서 검색해보고 아래의 내용들을 정리해보았다.
- - -

## 자바스크립트 패키지 매니저
패키지를 프로젝트에 설치하거나 갱신 또는 삭제하는데 사용되는 도구를 패키지 매니저한다.
현재 자바스크립트는 npm과 yarn이 있다.  

기본적으로 두 가지 도구 모두 패키지 잠금 기능을 지원하고 있다.  
npm은 package-lock.json 파일을, yarn은 yarn.lock 파일을 패키지 잠금 파일로 사용한다.  
즉, 패키지 잠금 파일은 자신이 개발을 하는 프로젝트에서 어떤 패키지 매니저를 사용하느냐에 따라 달라지게 된다.  
   
## 패키지 관리 매커니즘
패키지 관리를 위해 npm을 사용하든 yarn을 사용하든 해당 프로젝트의 메타 정보는 package.json 파일을 통해 관리가 된다.  
이 package.json 파일에는 해당 프로젝트가 의존하고 있는 모든 패키지 이름과 버전이 나열되어 있다.  

일반적으로 설치되어야 하는지 패키지들은 dependencies 항목에,  
개발할 때만 필요한 패키지들은 devDependencies 항목에 명시된다. 

설치가 필요한 패키지들이 package.json 파일에 등록이 되어 있으면,  
프로젝트의 모든 개발자는 패키지 매니저의 설치 커맨드 하나로 모든 패키지를 한번에 설치할 수 있다. 
```
npm install 
```

## 설치 시점에 따라 달라지는 패키지 버전
그렇다면 package.json 파일만 있으면
프로젝트의 모든 개발자가 항상 동일한 버전의 패키지를 설치할 수 있을까?  
안타깝게도 모든 개발자가 동시에 패키지를 설치하지 않는 이상 불가능하다. 
  
가장 큰 이유는 package.json 파일에 등록된 패키지의 버전이 ^나 ~ 등을 이용해서 범위로 지정된 경우가 많기 때문이다.   
이는 간단히 말해서 패키지는 설치할 당시 가장 최신 버전으로 설치를 진행한다는 의미와 비슷다. 

그래서 개발자가 패키지를 특정 버전을 지정하지 않았을 때,  
프로젝트를 개발자A가 3월에 설치했을 때의 버전과 개발자B가 12월에 설치했을 때의 버전이 상이할 수 있게 된다.  

## 패키지 잠금 🔒
**동일한 package.json 파일을 사용해도 서로 다른 버전의 패키지가 설치되는 문제를 패키지 잠금을 통해 해결할 수 있다.**  
yarn이나 npm을 사용해서 프로젝트에 새로운 패키지를 설치하면 package.json 파일에  
해당 패키지가 등록될 뿐만 아니라 패키지 잠금 파일이 생성되는 것을 볼 수 있다.  

package-lock.json이나 yarn.lock과 같은 패키지 잠금 파일에는  
프로젝트에 패키지에 최초로 추가될 당시에 정확히 어떤 버전이 설치가 되었는지를 기록된다. 

### 협업 👬
package-lock.json 파일을 프로젝트의 Git 저장소에 올려두면,  
다른 개발자들은 package.json 파일 뿐만 아니라 package-lock.json 파일까지 내려받게 될 것이다.  
그러면 프로젝트의 모든 개발자의 PC뿐만 아니라 애플리케이션이 배포되는 서버까지도,  
npm registry에 배포된 최신 버전을 무시하고 package-lock.json에 기록된 버전 기준으로 패키지가 설치될 것이다.  
