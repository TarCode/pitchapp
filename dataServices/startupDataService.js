module.exports = function(connection){

		var askDBto = function(query,data,cb){

			if(data == null){
				connection.query(query,cb);
			}
			else{
				connection.query(query,data,cb);
			}
		}

		var getData = function(query , cb){
				askDBto(query,null,cb)
		}


		this.getStartups = function(cb){
				getData('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time  FROM competition',cb);
		}

		this.addStartup = function(data,cb){
				askDBto('Insert into startup set ?',data,cb)
		}

		this.deleteStartup = function(data,cb){
			    askDBto('delete * from startup where id = ?',data,cb)
		}

		this.getStartupData = function(data,cb){
			    askDBto('select * from startup where id = ?',data,cb)
		}



		this.enter = function(data,cb){

			askDBto( 'SELECT id FROM startup WHERE name = ?' ,data.name,function(e,id){

					data={startup_id:id[0].id,competition_id:data.competition_id}
				    askDBto('INSERT INTO entrants SET ?',data,cb)
			});


		}



}
