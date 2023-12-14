pipeline {
  agent any
  tools {nodejs "NodeJs"
  }
  
  stages {
    stage('Build') {
      steps {
       git 'https://github.com/djo95/jenkins-demo.git'
        bat 'npm install'
      }
    }
  }
}
