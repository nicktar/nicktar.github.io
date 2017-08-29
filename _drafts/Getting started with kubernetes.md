---
layout: post
tags:
- containers
- docker
- orchestration
- kubernetes
categories:
- devops
- containers
- orchestration
title: 'Getting started with kubernetes (on a Windows 10 machine with Hyper-V)' 
date: 2016-12-29 22:17:17.000000000 +02:00
logo: assets/futures_talk.jpg
---

## Terminology and History

Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications wirtten in Go. It is the successor of Googles Borg system, which was used to run their services for many years As a Container Orchestration Engine and was donnated by Google to the Cloud Native Computing Foundation (CNCF) in 2015. There are others more or less like kubernetes (like Docker Swarm, Hashicorp Nomad, Mesos Marathonbu or Amazon ECS) but this isn't about them. The name kubernetes bases on the greek word κυβερνήτης [kʲivɛrˈnitis] which roughly translates to captain or skipper and references to the analogy of kubernetes beeing the helmsman of a container ship. Kubernetes is often shortened to k8s (eight letters between k and s). 

## Container Orchetration as such

When first setting up docker containers via plain dockerfiles it soon becomed cumbersome to keep in mind, how the containers depend on each other, how they are linked and therefore in witch order they need to be started (and rebuild for that matter). A first step in the right direction can be done with docker-compose, that can take care of all those issues but still has a static layout with manual scaling if there are performance peaks and restarts if a container fails for whatever reason. Production grade container orchestrating tools take care of these issues and more. For example kubernetes has:

### Automatic binpacking

To automatically start, stop and move containers based on current contraints such as resource requirements and availability, while keeping the application up and running. Additionally it tries to mix critical and best-effort workloads to increase resource utilization and reduce idle time, thus reducing the overall resource demand.save even more resources.

### Self-healing

Checks on containers to gather user defined health metrics, stops and restarts containers that fail such checks, replaces failing nodes and their respective containers and keeps clients from reaching the new containers until they're ready to serve.

### Horizontal scaling

Adds and removes container instances or even nodes using simple commands, a UI or even automatically based on the current CPU usage.

### Service discovery and load balancing

Gives each container a unique IP adress and groups sets of containers with common dns names while providing load-balaning for these. That way it acts as a fully fledged service discovery and or service directory.

### Automated rollouts and rollbacks

Uses techniques like Canary Deployment to progressively roll out changes in application or configuration across containers and nodes while keeping an eye on the health metrics. If these go down it doesn't proceed to kill all remaining instances but rolls back the changes. There is a growing ecosystem of deployment solutions.

### Secret and configuration management

Provide your containers with secrets and configurations without wiring them into your container configuration and update them without beeing forced to rebuild your containers.

### Storage orchestration

Automatically mount external storage from a wide range of supported storage providers (where local drives, public clouds, network shares or any of the others) and provide your application with access to it.

### Batch execution

In addition to services, Kubernetes can manage your batch and CI workloads, replacing containers that fail, if desired.

## Kubernetes Terminology
