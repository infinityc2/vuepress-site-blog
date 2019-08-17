---
title: การทำ provisioning อย่างง่ายด้วย docker + vagrant
tags: infrastructure
categories:
   - Infrastructure
   - Docker
   - Vagrant
   - Docker Swarm
   - Linux
---

# [Infrastructure] การทำ provisioning อย่างง่ายด้วย docker + vagrant

![alt text](https://miro.medium.com/max/700/0*I7aLTLcM-14ZPeNu.jpg)
### Required
* Ubuntu 18.04 or Later
* Vagrant
* Docker
* tmux (สำหรับเปิด terminal หลายตัวในหน้าเดียว)
* Oracle VM Virtualbox v5.2

### สร้าง Virtualbox ด้วย vagrant
เปิด `terminal` โดยกดปุ่ม `ctrl + alt + T` แล้วให้ทำการสร้างโฟลเดอร์เพื่อใช้ในการสร้าง virtualbox ใช้คำสั่งดังนี้

```sh
mkdir ubuntu && cd ubuntu
```

พิมพ์คำสั่งใน `terminal` ดังนี้
```sh
vagrant init ubuntu/bionic64
```
vagrant init เป็นคำสั่งของ vagrant ที่ใช้ในการเริ่มต้นสร้าง virtualbox โดยมีระบบปฏิบัติการเป็น `ubuntu/bionic64`

จะได้ไฟล์ที่ชื่อว่า `Vagrantfile` ให้ทำการเปิดไฟล์นี้แล้วแก้เป็น

```ruby
Vagrant.configure("2") do |config|
   config.vm.box = "ubuntu/bionic64"

   3.times do |n|
    config.vm.define "box#{n}" do |box|
     box.vm.hostname = "box#{n}"
     box.vm.network "private_network", ip: "192.168.33.1#{n}"
    end
   end

   config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
   end
end
```

ส่วนของ code ใน Vagrantfile เป็นภาษา Ruby ในส่วนบรรทัดที่ 2 บอกว่าเป็น virtualbox ที่มีระบบปฏิบัติการ ubuntu/bionic64 บรรทัดที่ 4 เป็นลูปทำ 3 ครั้ง เพื่อสร้าง virtualbox 3 ตัว บรรทัดที่ 6 เป็นการตั้งชื่อให้กับ virtualbox บรรทัดที่ 7 เป็นการกำหนด IP ให้กับ virtualbox และบรรทัดที่ 12 เป็นการกำหนดการใช้ ram ของ virtualbox แต่ละตัว โดยทั้ง 3 ตัว มี ram 1 GB
ไปที่ terminal แล้วใช้คำสั่ง

```sh
vagrant up
```

vagrant up เป็นคำสั่งในการสร้าง virtualbox ซึ่งจะใช้เวลาในการสร้างในระยะเวลาหนึ่ง

![shell](https://miro.medium.com/max/700/1*B0QxwuGc6nPkqWoMYRi67Q.png)

เมื่อสร้างเสร็จแล้วให้ทำการแบ่ง terminal หลายๆตัว

```sh
tmux
```

เมื่อเข้าโหมด tmux แล้วให้กด `ctrl + b` แล้วปล่อย และกด `shift + 5` หรือ `shift + ‘` (“5” จะแบ่ง terminal เป็นแนวตั้ง ‘ จะแบ่ง terminal เป็นแนวนอน) แบ่งทั้งหมดจำนวน 4 ตัว

![shell](https://miro.medium.com/max/700/1*lanEI6MCy8ICeZ3p8ZuoHw.png)

> การย้ายตำแหน่ง curser ให้กด ctrl + b แล้วปล่อยตามด้วยลูกศรทิศทาง

ให้ terminal แต่ละตัวใช้งาน virtualbox โดยใช้คำสั่ง

```sh
vagrant ssh box0
vagrant ssh box1
vagrant ssh box2
```

![shell](https://miro.medium.com/max/700/1*4jzlkVi54wiBYQe_DJqS5w.png)

สังเกตได้ว่าชื่อ user เปลี่ยนไป คือ เรากำลังใช่งาน virtualbox อยู่ในขณะนี้

> ให้ทำการตรวจสอบว่า virtualbox แต่ละตัวสามารถติดตั้ง docker ได้หรือไม่โดยใช้คำสั่ง `ping docker.com`

ทำการติดตั้ง docker ทั้ง 3 ตัว

```sh
curl -sSL https://get.docker.com | sudo sh
```

เมื่อติดตั้งเสร็จแล้วให้ไปที่เครื่อง box0 แล้วใช้คำสั่ง

```sh
sudo docker swarm init --advertise-addr=192.168.33.10
```
![shyell](https://miro.medium.com/max/633/1*BXF78c6Jt588-Tm0se0dbw.jpeg)

นำคำสั่ง docker swarm join ที่ได้จากเครื่อง box0 ไปใช้ในเครื่องที่เหลือเพื่อเชื่อมแต่ละ node เข้าด้วยกัน

หากเชื่อมต่อสำเร็จจะขึ้นว่า `“This node joined a swarm as a worker.”`

> เพื่อเช็คว่าแต่ละเครื่องเชื่อมต่อกันอยู่จริงให้ใช้คำสั่ง ping [ip ของอีกเครื่อง]

และหลังจากใช้งานเสร็จแล้วควรทำลาย virtualbox ทิ้งด้วยคำสั่ง

```sh
vagrant destroy
```

### สรุป
สิ่งที่ได้ทำมาทั้งหมดเราได้สร้าง virtualbox มาทั้งหมด 3 ตัวด้วย vagrant และใช้ docker swarm ทำ provisioning ให้ทั้ง 3 ตัวเชื่อมต่อกันและได้ server ออกมาขนาดเล็ก และทำออกมาด้วยขั้นตอนง่าย ๆ

---
<Badge :text="page" v-for="(page, i) in $page.frontmatter.categories" :key="i"/>