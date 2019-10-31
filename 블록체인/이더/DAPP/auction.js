var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:8545"));
var bidder = web3.eth.accounts[0];
web3.eth.defaultAccount = bidder;
window.ethereum.enable();
var auctionContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [],
		"name": "bid",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cancel_auction",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "highestBidder",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "highestBid",
				"type": "uint256"
			}
		],
		"name": "BidEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "withdrawal",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawalEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "CanceledEvent",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "auction_end",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "auction_start",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "bids",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get_owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "highestBid",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "highestBidder",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "Mycar",
		"outputs": [
			{
				"name": "Brand",
				"type": "string"
			},
			{
				"name": "Rnumber",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "STATE",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);
var contractAddress = "0x472e9aB2E3f85a51FD1E67Bb3F6E96eC28C5A84a";
var auction = auctionContract.at(contractAddress);

function bid() {
	var mybid = document.getElementById('value').value;
	// Automatically determines the use of call or sendTransaction based on the method type
	auction.bid({ value: web3.toWei(mybid, "ether"), gas: 200000 }, function (error, result) {
		if (error) {
			console.log("error is " + error);
			document.getElementById("biding_status").innerHTML = "Think to bidding higher";
		}
		if (!error)
			document.getElementById("biding_status").innerHTML = "Successfull bid, transaction ID" + result;
	});

};



function init() {

	// auction.auction_end(function(error, result){
	//     document.getElementById("auction_end").innerHTML=result;
	// });
	auction.auction_end(function (error, result) {
		document.getElementById("auction_end").innerHTML = result;
	});

	auction.highestBidder(function (error, result) {
		document.getElementById("HighestBidder").innerHTML = result;
	});

	auction.highestBid(function (error, result) {
		var bidEther = web3.fromWei(result, 'ether');
		document.getElementById("HighestBid").innerHTML = bidEther;

	});
	auction.STATE(function (error, result) {
		document.getElementById("STATE").innerHTML = result;

	});

	auction.Mycar(function (error, result) {
		console.log(result);
		document.getElementById("car_brand").innerHTML = result[0];
		document.getElementById("registration_number").innerHTML = result[1];

	});

	auction.bids(bidder, function (error, result) {
		var bidEther = web3.fromWei(result, 'ether');
		document.getElementById("MyBid").innerHTML = bidEther;

		console.log(bidder);
	});
}

var auction_owner = null;
auction.get_owner(function (error, result) {
	if (!error) {
		auction_owner = result;
		if (bidder != auction_owner)
			$("#auction_owner_operations").hide();
	}

});


function cancel_auction() {
	auction.cancel_auction(function (error, result) {
		console.log(result);
	});
}

function Destruct_auction() {
	auction.destruct_auction(function (error, result) {
		console.log(result);
	});
}

/*filter.get(callback): Returns all of the log entries that fit the filter.
filter.watch(callback): Watches for state changes that fit the filter and calls the callback. See this note for details.*/
var BidEvent = auction.BidEvent(); // var BidEvent = auction.BidEvent(({}, {fromBlock: 0, toBlock: 'latest'});


BidEvent.watch(function (error, result) {
	if (!error) {
		$("#eventslog").html(result.args.highestBidder + ' has bidden(' + result.args.highestBid + ' wei)');
	} else {

		console.log(error);
	}
});

var CanceledEvent = auction.CanceledEvent();

CanceledEvent.watch(function (error, result) {
	if (!error) {
		console.log(result);

		$("#eventslog").html(result.args.message + ' at ' + result.args.time);
	} else {

		console.log(error);
	}
});
