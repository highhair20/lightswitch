import piplates.RELAYplate as RELAY
from flask import Flask, jsonify, make_response       

app = Flask(__name__)  

##############################################################################    
###################### Set address of RELAYplate below: ######################
ppADDR=0
##############################################################################
 
# station 1 = relay 1
# station 2 = relay 2
# station 3 = relay 3
# station 4 = blue LED
# station 5 = relay 4
# station 6 = relay 5
# station 7 = relay 6
# station 8 = relay 7


# set the initial status to off
RELAY.RESET(ppADDR)                                                         
status = range(7)
for i in range(7):
    status[i]='0'


@app.route('/station', methods=['GET'])
def get_stations():
    re=[]  
    state = {
        'id' : 4,
        'state' : 0
    }
    re.append(state)
    mask=1
    states=RELAY.relaySTATE(ppADDR)
    for i in range(7):
        status = 0
        print i
        if (states & mask) != 0:
            status=1
        id = i+1
        if (i >= 3):
            id = i+2
        mask = mask<<1        
        state = {
            'id' : id,
            'state' : status
        }
        re.append(state)
    return jsonify(re)


@app.route('/station/<int:id>', methods=['GET'])
def get_station(id):
    if id > 8 or id < 1:
        return not_found('404')
    if (id == 4):
        state = {
            'id' : 4,
            'state' : 0
        }
    else:
        mask=1
        states=RELAY.relaySTATE(ppADDR)
        for i in range(7):
            status = 0
            if (states & mask) != 0:
                status=1
            mask = mask<<1
            if (i+1 == id):
                state = {
                    'id' : id,
                    'state' : getBit(states, i)
                }
    return jsonify(state)


@app.route('/station/<int:id>', methods=['PUT'])
def update_station(id):
    if id > 8 or id < 1:
        return not_found('404')
    if (id == 4):
        state = {
            'id' : 4,
            'state' : 0
        }
    else:
        if (id > 4):
            id = id-1
        RELAY.relayTOGGLE(ppADDR,id)
    return jsonify({}), 204


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404


def getBit(int_type, offset):
    mask = 1 << offset
    return(int_type & mask)
    
    

if __name__== '__main__':                                                      
    app.run(host='0.0.0.0',port=9001)