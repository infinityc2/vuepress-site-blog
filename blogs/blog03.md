---
title: Network
tags: network
categories:
    - Network
    - STP
    - Protocol
    - Spanning Tree Protocol
    - Computer Network
---

# [Network]การทำงานของ Spanning-Tree Protocol

![stp](https://miro.medium.com/max/486/1*turiWb2J__ip2sw68MEVeA.png)

Spanning-Tree Protocol (STP) เป็น Protocol ที่ใช้ป้องกันลูป (Loop) ใน Layer 2 โดยการทำงานคือจะ Blocking Port เพื่อไม่ให้รับส่งข้อมูลจนกว่าเส้นทางหลักจะมีปัญหา แต่ใน Layer 3 จะมีค่า TTL เพื่อป้องกัน Loop ได้

Loop ก็คือ สถานะที่อุปกรณ์ส่งข้อมูลออกไปแล้วเกิดการวนแบบไม่สิ้นสุด เมื่อมี Loop จะทำให้เกิดปัญหาตามมา 3 อย่างหลักๆ คือ

`Broadcast Storm` คือเมื่อเกิด Loop ขึ้น Broadcast Traffic จะถูส่งต่อไปเรื่อยๆ แบบไม่สิ้นสุด เกิดเป็นพายุ ฺBroadcast (Broadcast Storm) ทำให้ CPU ของ Switch นั้นสูงขึ้นและทำงานไม่ได้ในที่สุด

![stp](https://miro.medium.com/max/299/1*8MprdH-e6_Km8h6ButSyYg.png)

`Multiple Frame` Transmissions คือเครื่องปลายทางได้รับข้อมูล (Frame) เข้ามาซ้ำ ทำให้เสียเวลาในการประมวลผล

![stp](https://miro.medium.com/max/300/1*SQm762yVXeQs_H1pebq4vw.png)

`MAC Database Instability` คือ Switch ได้รับ MAC Address ของอุปกรณ์เดียวเข้ามาหลายทาง ทำให้ Switch เรียนรู้ MAC Address ที่ผิดพลาด

![stp](https://miro.medium.com/max/300/1*KgGzDy2vv22RJmJqAI_hhQ.png)

### หลักการทำงานของ STP

* เลือก Root Bridge คือใน 1 Network จะมี Switch เพียง 1 ตัวที่เป็น Root Bridge พิจารณาจาก Switch ที่มี Bridge ID น้อยที่สุด (Bridge ID = Priority + MAC Address) และขาของ Bridge ID เป็น Designated Port

* เลือก Root Port พิจารณาจาก Port ที่มีค่า Path Cost ไปหา Root Bridge ต่ำสุดถ้า Path Cost เท่ากันให้พิจารณาจาก Bridge ID โดย Switch จะมี Root Port ได้เพียง 1 ตัวเท่านั้น

|Link Bandwidth|Path Cost|
|--------------|---------|
|4 Mbps        |250      |
|10 Mbps       |100      |
|100 Mbps      |19       |
|1 Gbps        |4        |
|10 Gbps       |2        |

* เลือก Design Port ใน Link ระหว่าง Switch กับ Switch เรียกว่า Segment ต้องมี 1 Designated Port โดยพิจารณาจาก Path Cost ไป Root Bridge ต่ำสุด หากเท่ากันให้พิจารณาจาก Bridge ID ต่ำสุด ถ้า Bridge ID เท่ากัน ให้พิจารณาจาก Port ID ต่ำสุด และ port ที่เหลือจาก Root Port และ Designated Port คือ Block Port

### ตัวอย่างการคำนวณ STP

![stp](https://miro.medium.com/max/580/1*NSfaNhZxjBQYt_f5hrgDGg.png)

หา Root Bridge พิจารณาจาก Bridge ID ที่ต่ำสุด คือ SW-A และกำหนด DP

![stp](https://miro.medium.com/max/588/1*jHHDl0qtBD1FKxQaEoN8Ng.png)

หา Root Port พิจารณาจาก Path Cost ในที่นี้เป็น FastEthernet(100 Mbps) = 19 ให้พิจารณาแต่ละตัว 
`SW-C ไปยัง fa 0/1 = 19, `
`SW-C ไปยัง fa 0/2 -> fa 0/24 = 38,`
`SW-B ไปยัง fa 0/24 = 19, `
`SW-B ไปยัง fa 0/1 -> fa 0/1 = 38 `
เราจะได้ Switch ที่มี Root Port ที่ SW-B ที่ fa 0/24 และ SW-C ที่ fa 0/1

![stp](https://miro.medium.com/max/577/1*IxyjsflyptuU472_aS9K4A.png)

หา Designated Port ในที่นี้จะมี Path Cost เท่ากัน ให้พิจารณาจาก Bridge ID และ Designated Port อยู่ที่ SW-B ที่ fa 0/1 และ Block Port คือ SW-C ที่ fa 0/2

![stp](https://miro.medium.com/max/599/1*1jE0au5JTCZY_qpMQrzTpg.png)

---
<Badge :text="page" v-for="(page, i) in $page.frontmatter.categories" :key="i"/>