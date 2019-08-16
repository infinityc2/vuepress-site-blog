---
title: GoCD
tags: infrastructure
categories:
    - GoCD
    - CI/CD
    - Infrastructure
    - Continuous Integration
    - Continuous Delivery
---

# [GoCD]เครื่องมือการทำ CI/CD กับ GoCD

![gocd](https://miro.medium.com/proxy/1*J2iFOKfLesB6PafNvjYUsw.png)

### แนะนำ GoCD

GoCD เป็นเครื่องมือในการทำ CI/CD รูปแบบหนึ่ง ส่วนใหญ่เราจะคุ้นเคยกับ Jenkins, DroneCI หรือ CircleCI มากกว่า

GoCD เป็นเทคโนโลยีของ CNCF ในกลุ่ม Continuous Integration & Delivery เขียนด้วยภาษา Java และ Ruby สามารถใช้งานฟรี เป็น open source CI/CD server ง่ายต่อการทำ Continuous Delivery และสามารถแสดง workflow ที่ซับซ้อนในรูปแบบของ `Value Stream Map (VSM)`

### แล้ว Value Stream Map คืออะไร?
Value Stream Map หรือ VSM คือ มุมมองแบบ end-to-endของ pipeline จะแสดงรายละเอียดและเส้นทางของ pipeline ที่เชื่อมต่อกัน

![vsm](https://miro.medium.com/max/700/0*qxfrM6ZguUb0OtR7.png)
# 
![vsm](https://miro.medium.com/max/700/0*tPp5105Fvd66wbUj.png)

### Feature หลักๆ ของ GoCD
#### End to End Visualization
เหมือนที่ได้กล่าวมาข้างต้นคือเป็น VSM แสดงรายละเอียดและเส้นทางของ pipeline ที่แสดงการทำงานของ pipeline ให้ดูง่ายขึ้น
#### Cloud Native Deployments
GoCD สามารถรันใน cloud environment ที่ได้รับความนิยม เช่น Kubernetes, Docker, AWS และอื่นๆ
#### Complex Workflow Modeling
GoCD มีจุดเด่นในด้านการสร้างแบบจำลอง workflow ที่ซับซ้อน เพื่อให้ได้ feedback ที่รวดเร็ว parallel execution และการจัดการ dependency
#### Advanced Traceability
GoCD ช่วยแก้ปัญหาการทำงานที่เสียหายโดยการติดตามทุกการเปลี่ยนแปลงจากการ commit แบบ real-time สามารถเปรียบเทียบเนื้อหา ไฟล์และการส่งข้อความ ระหว่าง build 2 ตัว

### Platform ที่รองรับ
![platform](https://miro.medium.com/max/288/1*01veeP-lrnlyLdN2D4-6uQ.png)

GoCD รองรับหลาย Platform เช่น Windows, OSX, Linux หรือแม้กระทั่ง Cloud Provider เช่น Docker, Kubernetes และอื่นๆ

### Concept in GoCD
#### Task
Task หรือ build task คือสิ่งที่ต้องทำหรือดำเนินการ โดยปกติจะทำคำสั่งครั้งเดียว

![task](https://miro.medium.com/max/700/0*3OOLjXRG_gPC2nsl.png)

#### Job
Job ประกอบไปด้วยหลายๆ Task และทำงานตามลำดับ หาก Job ใดเกิดข้อผิดพลาด Job จะพิจารณาว่าล้มเหลว

เช่น Job มี 3 ตัว จะทำ ant ก่อนแล้วตามด้วย rake และตัวสุดท้ายจะเป็น shell script จะถูกรันเป็นตัวสุดท้าย

![job](https://miro.medium.com/max/700/0*bPKQWTVQPPbfDQXF.png)

Task ทุกตัวใน Job จะไม่ขึ้นต่อกันหรือเป็นอิสระต่อกันเมื่อเปลี่ยนแปลงค่า Environment Variable ใดๆ จะไม่ส่งผลกระทบต่อ Task อื่นๆ

#### Stage
Stage ประกอบด้วยหลายๆ Job และทำงานโดยไม่ขึ้นต่อกัน หาก job ล้มเหลวจะถือว่า Stage นั้นล้มเหลวด้วย

![stage](https://miro.medium.com/proxy/0*efJt_GZ4O8XjWOjD.png)

#### Pipeline
Pipeline ประกอบไปด้วยหลายๆ Stage แต่ละ Stage จะถูกเรียกตามลำดับ หาก Stage ใดล้มเหลว Pipeline นั้นจะถูกพิจารณาว่าล้มเหลวและ Stage ต่อไปจะไม่เริ่มทำงาน

![pipeline](https://miro.medium.com/max/700/0*MP8lcOwPACVkrY42.png)

จริงๆแล้วยังมีมากกว่านี้แต่นำมาเท่านี้ก่อนเพราะเยอะมาก หากต้องการศึกษาเพิ่มเติมสามารถศึกษาได้ที่ [GoCD Official](https://www.gocd.org/)

### สรุป
GoCD เป็นเครื่องมือ Open-source ในการพัฒนา Software ในการทำ CI/CD ที่ช่วยลดความซับซ้อนลงทำให้พัฒนาได้ค่อนข้างง่ายด้วย VSM และรองรับหลาย Platform

Reference

* [GoCD](https://www.gocd.org/)

* [CNCF](https://landscape.cncf.io/)

---
<Badge :text="page" v-for="(page, i) in $page.frontmatter.categories" :key="i"/>