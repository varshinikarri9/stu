terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

# pull image from Docker Hub
resource "docker_image" "student_backend" {
  name = "varshini89211/student-backend:latest"
}

# create container from that image
resource "docker_container" "student_backend_container" {
  name  = "tf-student-backend"
  # use the 'name' attribute from docker_image (not .latest)
  image = docker_image.student_backend.name

  ports {
    internal = 5000
    external = 5002
  }
}
