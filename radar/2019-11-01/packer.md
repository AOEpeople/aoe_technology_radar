---
title:      "Packer"
ring:       adopt
quadrant:   platforms-and-aoe-services

---

[Hashicorp Packer](https://www.packer.io/intro/getting-started/build-image.html) is a lightweight tool which automates the creation of any type of machine images (Machine Image As A Code) for multiple platforms. 
Packer is not a replacement of configuration management tools like Ansible. Packer works with tools like ansible to install software while creating images. 
Packer uses a configuration file to create a machine image. It uses the concepts of builders to spin up an instance, run provisioners to configure applications or services. 
Once setup is done, it shuts the instance down and save new baked machine instance with any needed post-processing. 
Packer only builds images. But once you have them you can deploy your infrastructure quickly and even scale by spawning any number of instances without doing extra configuration. 
Another benefit is, that machine images can be tested to verify if they are working correctly.
Packer supports multiple cloud providers like AWS, GCP, Digital Ocean etc.

Machine images are important for modern deployment pipelines and fast ramp of of new infrastructure. 
We are using Packer to build so called "Golden images" that are used in our [Infrastructure as Code](/methods-and-patterns/infrastructure-as-code.html) based provisionings.
