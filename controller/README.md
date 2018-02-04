
Remove the existing version of node and npm installed on Raspbian stretch.

```
sudo su - 
apt-get remove nodejs npm -y
```

Check which processor you are running.
```
uname -m
```

I have a Raspberry Pi 2 which has an ARMv7 processor.
Download the node binary that corresponds to your processor from 
https://nodejs.org/en/download/
```
cd /tmp
wget https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-armv7l.tar.xz
```

Uncompress the archive.
```
tar xf node-v8.9.4-linux-armv7l.tar.xz
```

Copy node to /usr/local
```
cd node-v8.9.4-linux-armv7l/
cp -R * /usr/local/  
```

Validate installation.
```
node -v
```
v8.9.4

```
npm -v
```
5.6.0

Install forever so the app stays up.
```
npm install -g forever
```


Install the controller code.
```
mkdir -p /opt/glolabs
cd /opt/glolabs/
git clone https://github.com/highhair20/switch.git
cd switch/controller
npm install
```




