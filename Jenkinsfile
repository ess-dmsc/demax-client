node('docker') {stage('Checkout'){checkout scm}
                stage('Angular/Karma Jasmine component genaration test'){
                sh "docker build -f Dockerfile-test  -t uo ."
                sh 'docker run  -t uo npm test'}}
