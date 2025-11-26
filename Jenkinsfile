pipeline {
    agent any

    tools {
        nodejs "node18"
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
                    bat 'npm install'
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo "Running Mocha unit tests..."
                dir('backend') {
                    bat 'npm test'
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
