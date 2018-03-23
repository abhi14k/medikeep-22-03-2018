 App = {
  web3Provider: null,
  contracts: {},

  init: function() {

    return App.initWeb3();
  },

  initWeb3: function() {
     // TODO: refactor conditional
     if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Adoption.json", function(Adoption) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Adoption = TruffleContract(Adoption);
      // Connect provider to interact with contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Adoption.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393

        App.render();
    });
  },

  render: function() {

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
      //  $("#accountAddress").html("Your Account: " + account);
      }
    });
    if(App.account===null)
    {
      $("#abc").html("Login to your Ethereum account");
    }
    else {
      document.write("<a href='pdetails.html'><button>View Details</button></a>")
    }

//    $("#p_button").on('click',)
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },
  // // kpatfunc: function(event){
  //   window.location.href= './src/kpat.html';
//},
  handleAdopt: function(event) {
    var name = $('#a').val();
    var id = $('#b').val();

    var b_day = $('#b_day').val();
    var gender = $('#gender').val();
    var ocu = $('#ocu').val();
    var blood = $('#blood').val();
    var mrg_status = $('#mrg_status').val();

    var home_add = $('#home_add').val();
    var current_add = $('#current_add').val();
    var country = $('#country').val();
    var state = $('#state').val();
    var city = $('#city').val();
    var phone_no = $('#phone_no').val();

    var f_name = $('#f_name').val();
    var l_name = $('#l_name').val();
    var email = $('#email').val();



    App.contracts.Adoption.deployed().then(function(instance) {

      i=instance;

      return i.personal_details(App.account,b_day,gender,ocu,blood,mrg_staus);
    }).then(function(result) {

      return i.personal_details(App.account,b_day,gender,ocu,blood,mrg_staus);

      // Wait for votes to update
      //$("#content").hide();
      //$("#loader").show();
    }).then(function(result1){

      return i.contact_details(App.account,home_add,current_add,country,state,city,phone_no);

    }).then(function(result2){

      return i.basic_details(App.account,f_name,l_name,email);

    }).catch(function(err) {
      console.error(err);
    });


  },

  show: function(event) {

    var candidatesResults = $("#candidatesResults");
    candidatesResults.empty();
    App.contracts.Adoption.deployed().then(function(instance){
      instance.Mans(App.account).then(function(candidate) {
        //var c =  candidate[0];
        //var b =  candidate[1];

        var f_name = candidate[0];
        var l_name = candidate[1];
        var email = candidate[2];
        // Render candidate Result
        var candidateTemplate = "<tr><th>" + c + "</th><td>" + b + "</td><td>" + "sss" + "</td></tr>"
        candidatesResults.append(candidateTemplate);

      // Render candidate ballot option
      //var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
      //candidatesSelect.append(candidateOption);
    });
   });

   App.contracts.Adoption.deployed().then(function(instance){
    instance.Mans2(App.account).then(function(candidate) {
      //var c =  candidate[0];
      //var b =  candidate[1];

      var b_day = candidate[0];
      var gender = candidate[1];
      var ocu = candidate[2];
      var blood = candidate[3];
      var mrg_status = candidate[4];

      // Render candidate Result
      var candidateTemplate = "<tr><th>" + c + "</th><td>" + b + "</td><td>" + "sss" + "</td></tr>"
      candidatesResults.append(candidateTemplate);

    // Render candidate ballot option
    //var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
    //candidatesSelect.append(candidateOption);
  });
 });

 App.contracts.Adoption.deployed().then(function(instance){
  instance.Mans3(App.account).then(function(candidate) {
    //var c =  candidate[0];
    //var b =  candidate[1];

    var state = candidate[0];
    var city = candidate[1];
    var country = candidate[2];
    var home_add = candidate[3];
    var current_add = candidate[4];
    var phone_no = candidate[5];

    // Render candidate Result
    var candidateTemplate = "<tr><th>" + c + "</th><td>" + b + "</td><td>" + "sss" + "</td></tr>"
    candidatesResults.append(candidateTemplate);

  // Render candidate ballot option
  //var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
  //candidatesSelect.append(candidateOption);
});
});

  }


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
