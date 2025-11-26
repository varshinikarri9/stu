pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "varshini89211/student-backend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling code from GitHub..."
                git branch: 'main', url: 'https://github.com/varshinikarri9/stu.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node dependencies..."
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo "Running Mocha unit tests..."
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Build SUCCESS"
        }
        failure {
            echo "❌ Build FAILED"
        }
    }
}
