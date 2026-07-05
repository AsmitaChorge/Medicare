# Medicare - Healthcare Static Website on AWS

A modern healthcare website hosted on **Amazon Web Services (AWS)** using a secure, scalable, and automated cloud architecture. This project demonstrates static website hosting with **Amazon S3**, **Amazon CloudFront**, **AWS Certificate Manager (ACM)**, **Amazon Route 53**, and **AWS CodePipeline** for CI/CD.

## Project Overview

The Medicare website is a static healthcare website designed to provide users with an intuitive interface for exploring healthcare services, doctors, appointments, and medical information.

Instead of hosting the website on a traditional web server, it is deployed using AWS cloud services to achieve:

- High availability
- Better performance
- Secure HTTPS access
- Automated deployments
- Cost-effective hosting

---

## Live Architecture

```
                     User
                       │
                       ▼
               Route 53 (DNS)
                       │
                       ▼
          CloudFront Distribution
         (HTTPS + CDN + Caching)
                       │
        Origin Access Control (OAC)
                       │
                       ▼
          Private Amazon S3 Bucket
         (HTML, CSS, JS, Images)




                Developer
                    │
                    ▼
                GitHub Repository
                    │
                    ▼
                AWS CodePipeline
                    │
                    ▼
                Amazon S3
                    │
                    ▼
                CloudFront
                    │
                    ▼
                Live Website
```

---

## AWS Services Used

| Service | Purpose |
|---------|---------|
| Amazon S3 | Static Website Storage |
| Amazon CloudFront | Content Delivery Network (CDN) |
| AWS Certificate Manager (ACM) | SSL/TLS Certificate |
| Amazon Route 53 | DNS Management |
| AWS CodePipeline | Continuous Deployment |
| GitHub | Source Code Repository |
| IAM | Secure Access Management |

---

## Features

- Responsive Healthcare Website
- Static Website Hosting
- HTTPS Enabled
- Global Content Delivery using CloudFront
- Private S3 Bucket
- Secure Access using Origin Access Control (OAC)
- Custom Domain Support
- Automated Deployment with GitHub & AWS CodePipeline
- Cloud Security Best Practices

---

## Project Workflow

1. Upload website source code to GitHub.
2. GitHub triggers AWS CodePipeline.
3. CodePipeline deploys the latest files to Amazon S3.
4. CloudFront serves the website globally.
5. HTTPS is enabled using AWS Certificate Manager.
6. Route 53 maps the custom domain to CloudFront.
7. Users can securely access the website.

---

## Security Best Practices

- S3 bucket is kept private.
- Public access is blocked.
- CloudFront is the only service allowed to access the bucket.
- HTTPS is enforced.
- SSL certificate is managed using AWS Certificate Manager.
- IAM permissions follow the Principle of Least Privilege.
- Website content is securely delivered through CloudFront.

---

## CI/CD Pipeline

```
Developer
     │
     ▼
GitHub Repository
     │
     ▼
AWS CodePipeline
     │
     ▼
Amazon S3
     │
     ▼
CloudFront Cache
     │
     ▼
Live Website
```

Whenever changes are pushed to the GitHub repository, AWS CodePipeline automatically deploys the updated files to Amazon S3, making the latest version available through CloudFront.

---

## Challenges Faced

Since this project was implemented by following an older AWS tutorial, several AWS Console changes were encountered:

- Origin Access Identity (OAI) has been replaced with **Origin Access Control (OAC)**.
- The CloudFront interface has been updated.
- Bucket policies are now generated automatically after configuring OAC.
- Some configuration options have been relocated within the AWS Console.
- CloudFront cache invalidation is required after deployments to reflect updated content.

These challenges provided valuable experience in adapting to the latest AWS services and interfaces.

---

## Output

## Project Screenshots

### 1. Amazon S3 Bucket Configuration

<p align="center">
  <img src="Screenshots/S3_bucket.png" width="900">
</p>

---

### 2. CloudFront Distribution

<p align="center">
  <img src="Screenshots/cloudfront.png" width="900">
</p>

---

### 3. CloudFront Configuration

<p align="center">
  <img src="Screenshots/cloudfront2.png" width="900">
</p>

---

### 4. AWS Certificate Manager

<p align="center">
  <img src="Screenshots/certificate_manager.png" width="900">
</p>

---

### 5. SSL Certificate Issued

<p align="center">
  <img src="Screenshots/certificate_manager2.png" width="900">
</p>

---

### 6. AWS CodePipeline

<p align="center">
  <img src="Screenshots/pipeline.png" width="900">
</p>

---

### 7. Pipeline After Commit

<p align="center">
  <img src="Screenshots/pipeline_after_commit_changes.png" width="900">
</p>

---

### 8. Commit Changes to GitHub

<p align="center">
  <img src="Screenshots/commit_changes.png" width="900">
</p>

---

### 9. Website Hosted on CloudFront

<p align="center">
  <img src="Screenshots/host_on_CF.png" width="900">
</p>

---

## Learning Outcomes

Through this project, I gained practical experience with:

- Amazon S3
- Amazon CloudFront
- Route 53
- AWS Certificate Manager
- IAM
- AWS CodePipeline
- GitHub Integration
- Static Website Hosting
- HTTPS Configuration
- CDN Concepts
- CI/CD Automation
- AWS Security Best Practices

---

## Future Enhancements

- Add AWS CodeBuild for automated testing.
- Automate CloudFront cache invalidation.
- Monitor website performance using Amazon CloudWatch.
- Integrate AWS WAF for enhanced security.
- Add AWS Lambda for serverless backend functionality.

---

## License

This project is created for learning and educational purposes.