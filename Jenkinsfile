pipeline {
  agent any
  tools {nodejs "NodeJs"
  }
  
  stages {
    stage('Build') {
      steps {
       git 'https://github.com/djo95/rencar.git'
        bat 'npm install'
      }
    }
  }
}
