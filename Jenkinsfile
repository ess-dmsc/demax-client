node('docker') {stage('Checkout'){checkout scm}
                stage('Unit Test User Office '){
                sh "docker build  .  -t uo"
                sh 'docker run  -t uo npm test'}}