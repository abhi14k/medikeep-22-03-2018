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
    /*if(App.account===null)
    {
      $("#abc").html("Login to your Ethereum account");
    }
    else {
      document.write("<a href='pdetails.html'><button>View Details</button></a>")
    }*/

//    $("#p_button").on('click',)
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  vala: function(event) {

    if(App.account===null)
    {
      $("#q").html("Login to your Ethereum account");
    }
    else {
      //document.write("<a href='pdetails.html'><button>View Details</button></a>");
      //window.open("https://www.youtube.com/watch?v=G83c-ZqZ7pk");
      window.open("welcome.html","_self");
    }

  },
  vala1: function(event) {

    if(App.account===null)
    {
      $("#q").html("Login to your Ethereum account");
    }
    else {
      //document.write("<a href='kregister.html'><button>View Details</button></a>");
      window.open("kmenu.html","_self");
    }

  },
  vala2:function(event){

    App.contracts.Adoption.deployed().then(function(instance) {

      i=instance;
      return i.voters(App.account);

    }).then(function(haas){
      if(App.account!=null)
        {
          if(haas)
          {

              $("#q").html("You are already Registered");

          }else
            {

              window.open("kmenu.html","_self");

            }
        }else{
          $("#q").html("Login to your Ethereum account");
        }
    });

  },
  handleAdopt: function(event) {
    //var name = $('#a').val();
    //var id = $('#b').val();

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

      return i.personal_details(App.account,b_day,gender,ocu,blood,mrg_status);
    }).then(function(result1){

      return i.contact_details(App.account,home_add,current_add,country,state,city,phone_no);

    }).then(function(result2){

      return i.basic_details(App.account,f_name,l_name,email);

    }).then(function(result3){

      window.open("welcome.html","_self");


    }).catch(function(err) {
      console.error(err);
    });


  },
  add: function(event) {

    var curDate = new Date();
    var dd = curDate.getDate();
    var mm = curDate.getMonth();
    var yyyy = curDate.getFullYear();
    var curHour = curDate.getHours();
    var curMin = curDate.getMinutes();
    var addd = $("#disease").val();
    var na = $('#na').val();

    App.contracts.Adoption.deployed().then(function(instance) {

      i=instance;

      return i.getstring(na);
    }).then(function(result) {

      result = result + "Date: " + dd + "/" + (mm+1) + "/" + yyyy + "\t\t\t\t\t\t\t" + "Time: " + curHour + ":" + curMin + "<br>"+ addd +"<br>";

      $("#ans").html("kk"+ result);
      return i.symtoms(na,result);

    });

    //   var newPost = document.createElement('p');
		// newPost.innerHTML = ("Date: " + dd + "/" + (mm+1) + "/" + yyyy + "\t\t\t\t\t\t\t" + "Time: " + curHour + ":" + curMin + "<br>" + addd);
    // t.insertBefore(newPost, t.firstChild);


    //$("#date").html( "Date: " + dd + "/" + (mm+1) + "/" + yyyy + "\t\t\t\t\t\t\t\t\t\t\t\t" + "Time: " + curHour + ":" + curMin);
    //$("#t").html("" + addd);
    //document.write(curHour + ":" + curMin);

  },

  show: function(event) {

      App.contracts.Adoption.deployed().then(function(instance)
      {
        instance.Mans(App.account).then(function(candidate)
        {

          var f_name = candidate[0];
          var l_name = candidate[1];
          var email = candidate[2];

          // Render candidate Result
          $("#fname").html("First Name: " + f_name);
          $("#lname").html("Last Name: " + l_name);
          $("#mail").html("Email ID: " + email);
        });
      });

      App.contracts.Adoption.deployed().then(function(instance)
      {
        instance.Mans2(App.account).then(function(candidate)
        {


          var b_day = candidate[0];
          var gender = candidate[1];
          var ocu = candidate[2];
          var blood = candidate[3];
          var mrg_status = candidate[4];

          $("#bday").html("Birthday: " + b_day);
          $("#gnder").html("Gender: " + gender);
          $("#occup").html("Occupation: " + ocu);
          $("#bldgrp").html("Blood Group: " + blood);
          $("#mrgst").html("Marital Status: " + mrg_status);
      });
    });

      App.contracts.Adoption.deployed().then(function(instance)
      {
        instance.Mans3(App.account).then(function(candidate) {

        var state = candidate[0];
        var city = candidate[1];
        var country = candidate[2];
        var home_add = candidate[3];
        var current_add = candidate[4];
        var phone_no = candidate[5];

        $("#haddr").html("Home Address: " + home_add);
        $("#caddr").html("Current Address: " + current_add);
        $("#cty").html("City: " + city);
        $("#sta").html("State: " + state);
        $("#cnry").html("Country: " + country);
        $("#phn").html("Phone No.: " + phone_no);
      });
      });

},

show1: function(event) {

  var na = $('#na').val();

  App.contracts.Adoption.deployed().then(function(instance)
  {
    instance.Mans(na).then(function(candidate)
    {

      var f_name = candidate[0];
      var l_name = candidate[1];
      var email = candidate[2];

      // Render candidate Result
      $("#fname").html("First Name: " + f_name);
      $("#lname").html("Last Name: " + l_name);
      $("#mail").html("Email ID: " + email);
    });
  });

  App.contracts.Adoption.deployed().then(function(instance)
  {
    instance.Mans2(na).then(function(candidate)
    {


      var b_day = candidate[0];
      var gender = candidate[1];
      var ocu = candidate[2];
      var blood = candidate[3];
      var mrg_status = candidate[4];

      $("#bday").html("Birthday: " + b_day);
      $("#gnder").html("Gender: " + gender);
      $("#occup").html("Occupation: " + ocu);
      $("#bldgrp").html("Blood Group: " + blood);
      $("#mrgst").html("Marital Status: " + mrg_status);
  });
});

  App.contracts.Adoption.deployed().then(function(instance)
  {
    instance.Mans3(na).then(function(candidate) {

    var state = candidate[0];
    var city = candidate[1];
    var country = candidate[2];
    var home_add = candidate[3];
    var current_add = candidate[4];
    var phone_no = candidate[5];

    $("#haddr").html("Home Address: " + home_add);
    $("#caddr").html("Current Address: " + current_add);
    $("#cty").html("City: " + city);
    $("#sta").html("State: " + state);
    $("#cnry").html("Country: " + country);
    $("#phn").html("Phone No.: " + phone_no);
  });
  });

  App.contracts.Adoption.deployed().then(function(instance)
  {
    instance.Mans4(na).then(function(candidate) {

    var state1 = candidate;
    var curDate = new Date();
    var dd = curDate.getDate();
    var mm = curDate.getMonth();
    var yyyy = curDate.getFullYear();
    var curHour = curDate.getHours();
    var curMin = curDate.getMinutes();

    var newPost = document.createElement('p');
		newPost.innerHTML = (state1);
    t.insertBefore(newPost, t.firstChild);

  });
  });

},
show11: function(event)
      {
        App.contracts.Adoption.deployed().then(function(instance)
          {
            i=instance;
            return i.getAccount();
          }).then(function(result)
        {
          var candidatesResults = $("#candidatesResults");
          candidatesResults.empty();


          var details;
          var details1;
            var details2;
            var h=0;
          for(var j=0;j<result.length;j++)
          {
            i.Mans(result[j]).then(function(result11)
            {
              var f_name = result11[0];
              var l_name = result11[1];
              var email = result11[2];

              details = "<tr><th>" + f_name + "</th><td>" + l_name + "</td><td>" + email




            });
            i.Mans2(result[j]).then(function(result22)
            {
            var b_day = result22[0];
            var gender = result22[1];
            var ocu = result22[2];
            var blood = result22[3];
            var mrg_status = result22[4];

            details1 = details + "</td><td>" + b_day + "</td><td>" + gender + "</td><td>" + ocu + "</td><td>" + blood + "</td><td>" + mrg_status



            //var newPost = document.createElement('q');
            // newPost.innerHTML = ("hello");
            });
            i.Mans3(result[j]).then(function(result33)
            {
              var home_add = result33[0];
              var current_add = result33[1];
              var country = result33[2];
              var state = result33[3];
              var city = result33[4];
              var phone_no = result33[5];

              details2 = details1 + "</td><td>" +home_add + "</td><td>" + current_add + "</td><td>" + country + "</td><td>" + state + "</td><td>" + city + "</td><td>" + phone_no



            });

            i.Mans4(result[j]).then(function(result44)
            {
              var s = result44;

              var search = $('#hellop').val();

              if(s.includes(search))
              h++;

              //if(s.includes("TB"))
              //tb++;



                var details3 = details2 +  "</td><td>" + s + "</td></tr>"
                candidatesResults.append(details3);

                $("#output").html("Numer of "+ search + "patient : " + h);

            });
            // var details = "<tr><th>" + f_name + "</th><td>" + l_name + "</td><td>" + email + "</td><td>" + b_day + "</td><td>" + gender + "</td><td>" + ocu
            // + "</td><td>" + blood + "</td><td>" + mrg_status + "</td><td>" + home_add + "</td><td>" + current_add + "</td><td>" + country + "</td><td>" +
            // state + "</td><td>" + city + "</td><td>" + phone_no + "</td><td>" + s+ "</td></tr>"
            //   candidatesResults.append(details);
          }
        });
          // var allpat=$("#allpat");
          // allpat.empty();
          // document.write(result+"<br>");
          // document.write(result.length);

      //  });
      },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
