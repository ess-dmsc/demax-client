node('docker') {stage('Checkout'){checkout scm}
                stage('Unit Test DEMAX Web client '){
                sh "docker build  "./Dockerfile-test"  -t uo"
                sh 'docker run  -t uo npm test'}}
