node('docker') {
  stage('Checkout'){
    checkout scm
  }
  stage('Unit test'){
    sh "docker build -f Dockerfile-test  -t uo ."
    sh 'docker run  -t uo npm test'
  }
  stage('Production build'){
  if (env.BRANCH_NAME == 'master'){
    withCredentials([ usernamePassword(credentialsId: 'dockerhubess',usernameVariable: 'docker_user',passwordVariable: 'docker_password' )]) {
          sh 'docker login -u essdmscdm -p $docker_password '
          def IMAGE_ID = sh ( script: 'git rev-parse HEAD',returnStdout: true).trim()
          sh "docker build . -t essdmscdm/demax-client:latest -t essdmscdm/demax-client:${IMAGE_ID}"
          echo "Git image id : ${IMAGE_ID}"
          sh "docker push essdmscdm/demax-client:${IMAGE_ID}"
          sh "docker push essdmscdm/demax-client:latest"
          sh "docker rmi essdmscdm/demax-client:${IMAGE_ID}"
          }
          }
          }
}