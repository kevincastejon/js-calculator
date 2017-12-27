# PiooJSTools - Event, Network and utilitary set of tools

## What's in the box?

PiooJSTools Javascript library contains three main packages:
- node.net.udp package is a full library handling UDP communication. It holds the 3 core classes UDPManager, UDPServer and UDPClient that allows you to setup options reliability on every message.
- common.events package is a custom event system based on the javascript/actionscript one that makes listening to events easier and more readable. It allows you to extends its base classes easily to add properties suiting your needs.<br>
Two more packages are included, 'common.utils' which contains many utilitary classes such as Timer,MathSup,etc... and 'createJSExtension' which provide more tools and classes over the createJS framework such as Clip with multiple frames, UI elements,etc... (WIP and not documented yet)<br>
All the classes from common packages are usable inside both nodejs and browser js<br>
All the classes from node packages are usable only inside nodejs<br>
All the classes from createJSExtension packages are usable only inside createJS framework

	
## Why use this custom event system instead of the native one (JS event emiters)?

* The events package is a custom event system based on the AS3 one that makes listening to events easier and more readable, these are the main advantages:
  <br><br>
  - __Classic but better!__ Use classic callback methods system, callbacks method that accepts Event and inherited object as parameter<br>
  - __Enjoy readability!__ Use constants holding different "names" for a unique Event (or inherited) class, as in the AS3 way (MouseEvent.CLICK , MouseEvent.RIGHT_CLICK, etc...)<br>
  - __Don't go mad with "this" anymore!...__ JS "vanilla" force you to use or an arrow function and/or a "that = this" hack for retrieving the right scope into callbacks methods.<br>With EventDispatcher package, specify the scope the "this" keyword will refer to inside the callback method when you add an event listener as a third parameter.<br>
  - __...Nor with listeners removing!__ JS "vanilla" makes it complicated to remove event listeners when an arrow function had to be used for retrieving the right "this" scope (see the above line).<br>With EventDispatcher package, you can register your actual method and unregister it the same classic way<br>
  
  

Examples:
```
//Simple usage, without any extends

//Instantiate an EventDispatcher (or inherited) and add a listener
var ed = new EventDispatcher();
ed.addEventListener("someEventName", myCallback,this);   //Specify the scope as a third parameter
//Then somewhere in your code, call the DispatchEvent method of your EventDispatcher instance
ed.dispatchEvent(new Event("someEventName"));

    function myCallback(e){
    //Retrieve the Event instance as parameter and the right scope with 'this' keyword
    console.log(e.name+" event has been dispatched. 'this' keyword refers to "+this);
    }

//Advanced usage, with extending of EventDispatcher and Event

//Simple usage, without any extends
//Instantiate an EventDispatcher (or inherited) and add a listener
var ed = new EventDispatcher();
ed.addEventListener("someEventName", myCallback,this);   //Specify the scope as a third parameter
//Then somewhere in your code, call the DispatchEvent method of your EventDispatcher instance
ed.dispatchEvent(new Event("someEventName"));
    function myCallback(e){
    //Retrieve the Event instance as parameter and the right scope with 'this' keyword
    console.log(e.name+" event has been dispatched. 'this' keyword refers to "+this);
    }
    
    
    
//Advanced usage, with extending of EventDispatcher and Event
  class ContainerEvent extends Event
  {
      static get ELEMENT_ADDED() { return "elementAdded"; }
      static get ELEMENT_REMOVED() { return "elementRemoved"; }
      static get FULL() { return "full"; }
      static get EMPTY() { return "empty"; }
      constructor(type, numberOfElements, maxElements)
      {
          super(type);
          this._numberOfElements = numberOfElements;
          this._maxElements = maxElements;
      }
      get numberOfElements(){ return (this._numberOfElements); }
      get maxElements(){ return (this._maxElements); }
      get fillingRatio(){ return (this._numberOfElements / this._maxElements); }
  }
 
 
  class RiceBag extends EventDispatcher
  {
      constructor(){
          super();
          this._maxRiceGrain = 100;
          this._currentRiceGrainNumber = 0;
      }
      addRice(numberOfRiceGrain)
      {
          this._currentRiceGrainNumber += numberOfRiceGrain;
          if (this._currentRiceGrainNumber > this._maxRiceGrain) this._currentRiceGrainNumber = this._maxRiceGrain;
          this.dispatchEvent(new ContainerEvent(ContainerEvent.ELEMENT_ADDED, this._currentRiceGrainNumber, this._maxRiceGrain));
          if (this._currentRiceGrainNumber == this._maxRiceGrain) this.dispatchEvent(new ContainerEvent(ContainerEvent.FULL, this._currentRiceGrainNumber, this._maxRiceGrain));
      }
      removeRice(numberOfRiceGrain)
      {
          this._currentRiceGrainNumber -= numberOfRiceGrain;
          if (this._currentRiceGrainNumber < 0) this._currentRiceGrainNumber = 0;
          this.dispatchEvent(new ContainerEvent(ContainerEvent.ELEMENT_REMOVED, this._currentRiceGrainNumber, this._maxRiceGrain));
          if (this._currentRiceGrainNumber == 0) this.dispatchEvent(new ContainerEvent(ContainerEvent.EMPTY, this._currentRiceGrainNumber, this._maxRiceGrain));
      }
  }
 
  //Instantiate a RiceBag which extends EventDispatcher and add listeners to it
  var bag = new RiceBag();
  bag.addEventListener(ContainerEvent.ELEMENT_ADDED, myCallback,this);     //Specify the scope as a third parameter
  bag.addEventListener(ContainerEvent.ELEMENT_REMOVED, myCallback,this);   //
  bag.addEventListener(ContainerEvent.EMPTY, myCallback,this);             //
  bag.addEventListener(ContainerEvent.FULL, myCallback,this);              //
  //Then anywhere in your code, add and remove some rice off the bag
  bag.addRice(26);
  bag.addRice(48);
  bag.removeRice(12);
  bag.addRice(70);
  bag.removeRice(200);
      function myCallback(e)
      {
          //Monitors the events dispatched by the bag
          console.log(e.type + " - " + e.numberOfElements + " rice grains on " + e.maxElements + ". The bag is full at " + e.fillingRatio + " and 'this' keyword refers to "+this);
      }
```
[Check the examples for more information]
(https://github.com/lePioo/PiooCSTools/tree/master/piooCSToolsTester)

## Why use this udp network system instead of the native one (JS dgram socket)?
The udp package and its three main classes UDPManager, UDPClient and UDPServer are offering more flexible reliability and powerful features on top of dgram
- UDPManager is the core class of the whole udp package. It allows you to send and receive easily data through UDP, to create channels with differents reliability settings such as delivery guaranty, order maintain, or just send without any callback.
```
UDPManager is the core class of the whole udp package. It allows you to send and receive easily data through UDP, to create channels with differents reliability settings such as delivery guaranty, order maintain, or just send without any callback.
 <br/>
  For more advanced features such as peers connection, ping, timeout, etc... please see UDPClient and see UDPServer
  @example
 
  //Instantiate UDPManager and bind on the port of your choice
  UDPManager udpm = new UDPManager(9876);
 
  //Add listeners on the instance of UDPManager
  udpm.addEventListener(UDPManagerEvent.BOUND, udpManagerHandler, this);
  udpm.addEventListener(UDPManagerEvent.DATA_CANCELED, udpManagerHandler, this);
  udpm.addEventListener(UDPManagerEvent.DATA_DELIVERED, udpManagerHandler, this);
  udpm.addEventListener(UDPManagerEvent.DATA_RECEIVED, udpManagerHandler, this);
  udpm.addEventListener(UDPManagerEvent.DATA_RETRIED, udpManagerHandler, this);
  udpm.addEventListener(UDPManagerEvent.DATA_SENT, udpManagerHandler, this);
 
  //Add a UDPChannel that will retry to send the data until it reaches the target each 50ms during 1000ms before canceling, it will maintain order meaning the next message sent throught this channel will wait for that message to be received or canceled before being sent
  udpm.addChannel("mainChannel", true, true, 50, 1000);
 
  //Send a message to the target IP and port
  udpm.send("mainChannel", { msg = "Hello!" }, "x.x.x.x", 6789);
 
       function udpManagerHandler(e){
 
       //Monitor UDPManagerEvents
       console.log(e.name);
       }
```
- UDPClient allows you to connect to a UDPServer (C#, AS3 or JS), to send and receive messages easily to it, and to get many feedback like connection, ping, server timeout
```
//Instantiate UDPClient and bind on the port of your choice
var client = new UDPClient(9876);
//Add listeners on the instance of UDPClient
client.addEventListener(UDPClientEvent.CONNECTED_TO_SERVER, clientHandler,this);
client.addEventListener(UDPClientEvent.CONNECTION_FAILED, clientHandler,this);
client.addEventListener(UDPClientEvent.SERVER_PONG, clientHandler,this);
client.addEventListener(UDPClientEvent.SERVER_SENT_DATA, clientHandler,this);
client.addEventListener(UDPClientEvent.SERVER_TIMED_OUT, clientHandler,this);
//Add a UDPChannel that will retry to send the data until it reaches the target each 50ms during 1000ms before canceling, it will maintain order meaning the next message sent throught this channel will wait for that message to be received or canceled before being sent
client.addChannel("mainChannel", true, true, 50, 1000);
//Connect the client to the server IP and port
client.connect("x.x.x.x", 6789);
//Send a message to the target IP and port
client.sendToServer("mainChannel", { msg = "Hello!" });
     function clientHandler(e){
     //Monitor UDPClientEvents
     console.log(e.name);
         if(e.name==UDPClientEvent.Names.SERVER_SENT_DATA){
         //Display received messages
         console.log(e.udpDataInfo.data);
         }
     }
```
- UDPServer allows you to receive connections from UDPClients (C#, AS3 or JS), to send and receive messages easily to them, and to get many feedbacks like connection, ping, clients timeout
```
//Instantiate UDPServer and bind on the port of your choice
UDPServer server = new UDPServer(6789);
//Add listeners on the instance of UDPServer
server.addEventListener(UDPServerEvent.CLIENT_CONNECTED, serverHandler, this);
server.addEventListener(UDPServerEvent.CLIENT_PONG, serverHandler, this);
server.addEventListener(UDPServerEvent.CLIENT_RECONNECTED, serverHandler, this);
server.addEventListener(UDPServerEvent.CLIENT_SENT_DATA, serverHandler, this);
server.addEventListener(UDPServerEvent.CLIENT_TIMED_OUT, serverHandler, this);
//Add a UDPChannel
server.addChannel("mainChannel", true, true, 50, 1000);
     function serverHandler(UDPServerEvent e){
     //Monitor UDPServerEvents
     console.log(e.type);
         if(e.type==UDPServerEvent.CLIENT_SENT_DATA){
         //Display received messages
         console.log(e.udpDataInfo.data);
         }
         if(e.type==UDPServerEvent.CLIENT_SENT_DATA){
         //Send a welcome message to the freshly connected peer
         server.sendToClient("mainChannel", { msg = "Welcome!" },e.udpDataInfo.udpPeer);
         }
}
```

## How to install?

Simply add the piooJSTools sources folder to your project root folder.

The NPM module is coming soon...

[Github sources](https://github.com/lePioo/PiooCSTools/tree/master/piooCSTools)

## Can I use these classes into nodeJS ?
Before using a class you have to import the file with node classic way, the 'require' call
```
require("./piooJSTools/common/utils/Timer.js");

var timer = new Timer(1000);

```
[Check the examples for more information]
(https://github.com/lePioo/PiooCSTools/tree/master/piooCSToolsUnityTester)
## Can I use these classes into browser ?
Before using a class you have to import the file with html classic way, the 'script' tag<br>
HTML side:
```
<script type="text/javascript" src="./piooJSTools/common/utils/Timer.js"></script>
```
Javascript side:
```
var timer = new Timer(1000);
```
[Check the examples for more information]
(https://github.com/lePioo/PiooCSTools/tree/master/piooCSToolsUnityTester)