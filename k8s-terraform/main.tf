terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

resource "kubernetes_deployment_v1" "angular_deployment" {
  metadata {
    name = "angular-app-deployment"
    labels = {
      app = "my-angular-app"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "my-angular-app"
      }
    }

    template {
      metadata {
        labels = {
          app = "my-angular-app"
        }
      }

      spec {
        container {
          image = "claudiaserb/my-angular-app:1.0.2"
          name  = "angular-app-container"

          image_pull_policy = "Always"
          port {
            container_port = 4200
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "angular_service" {
  metadata {
    name = "my-angular-service"
  }
  spec {
    selector = {
      app = kubernetes_deployment_v1.angular_deployment.spec.0.template.0.metadata.0.labels.app
    }
    type = "NodePort"
    port {
      port        = 8080
      target_port = 4200
    }
  }
}
