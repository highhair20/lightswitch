
Remove the existing version of node installed on Raspbian.

```
sudo su - 
apt-get remove nodejs -y
```

Install n (it will also install latest stable Node.js):

```
curl -L https://git.io/n-install | bash
```

Verify:

```
pi@raspberrypi:~ $ node --version
nv7.6.0
pi@raspberrypi:~ $ npm --version
4.1.2
```

Install the controller code.

```
cd /opt/glolabs/
git clone https://github.com/highhair20/lightswitch.git
cd controller
npm install
```




