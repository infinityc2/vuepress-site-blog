---
title: มาลองทำ CI ด้วย travis ci
tags: infrastructure
categories:
    - Travis CI
    - CI/CD
    - Continuous Integration
    - CI/CD Pipeline
    - Pipeline
---

# [TravisCI] มาลองทำ CI ด้วย travis ci

![travis](https://cdn-images-1.medium.com/max/800/0*5pE6wD1pTHOYl1Bl.png)

Travis Ci เป็นตัวทำ CI/CD ที่ง่ายโดยทำการ Sync กับ Repository ใน Github ของเราและทำ CI/CD ได้อย่างรวดเร็ว และยังรองรับหลายภาษา

บทความนี้จะเป็นการทำ CI แบบรีบๆ ด้วย Travis CI และก่อนทำ CI เราจะต้องมี Github Account ซะก่อน [Travis CI](https://travis-ci.org)

![travis](https://cdn-images-1.medium.com/max/800/1*D4evFOpOyBnCcMuo4nnykQ.png)

เมื่อ Login เสร็จแล้วในตั้งค่าของ Github ในส่วนของ Applications ->Authorized OAuth Apps จะมี Travis CI อยู่

![travis](https://cdn-images-1.medium.com/max/800/1*wV50Zq6nkiAI-EC9RPDKBQ.png)

หลังจาก Login ด้วย Github แล้วให้เข้าไปในหน้า Setting ของ Travis CI

![travis](https://cdn-images-1.medium.com/max/800/1*Ga58knybKeAkuQdscljzAw.png)

จะมี Repository ที่อยู่ใน Github ของเราอยู่ ในที่นี้จะเลือก project ที่ใช้ spring boot เป็นหลัก โดยใน project จะใช้ Gradle เป็นตัวรัน project

ให้ทำการเลือกเปิดใช้งาน Repository

![travis](https://cdn-images-1.medium.com/max/800/1*jDK028mUfBerh1ccPW9I4w.png)

ใน Repository นี้ให้สร้างไฟล์ชื่อว่า .travis.yml แล้วตั้งค่าดังนี้

```yml
dist: xenial
language: java
script:
  - ./gradlew assemble
  - ./gradlew test
jdk: 
  - openjdk8
before_install:
  - chmod +x gradlew
  - ./gradlew clean
```

> หากใช้ java version 8 ให้ใช้ openjdk8 อย่าใช้ oraclejdk8 เพราะ travis จะรันไม่ได้

ตัวของ travis ci จะ trigger repository ของเราอัตโนมัติเมื่อมีการเปลี่ยนแปลงโดยจะทำการ build repository

![travis](https://cdn-images-1.medium.com/max/800/1*94RwaSs7myxnItFVrY67xQ.png)

ระหว่าง build จะมี log ไว้ดู Error ต่างๆ

![travis](https://cdn-images-1.medium.com/max/800/1*suMOt5YFHFdWWnVvbm1dQA.png)

หาก build เสร็จจะได้ดังนี้

![travis](https://cdn-images-1.medium.com/max/800/1*-1JnkNjrnAWkNay4XkxOxg.png)

![travis](https://cdn-images-1.medium.com/max/800/1*RwThfidAhIcckhHgj80dTQ.png)

สามารถดูเพิ่มเติมได้ที่ [Travis CI](https://docs.travis-ci.com/user/tutorial/)

Example in [github](https://github.com/infinityc2/sa-backend)


---
<Badge :text="page" v-for="(page, i) in $page.frontmatter.categories" :key="i"/>