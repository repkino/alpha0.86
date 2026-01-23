//for CE temp



//import field
import m from './modules/math.js'; // use as m.getDistance() etc.
import { Bezier } from "./modules/bezier/bezier.js";
let rt = 0;

function init(runtime){
	rt = runtime;
}

let paths = {}

function addPath(UID){
	paths[UID] = new Path(UID);
}

class Path{
	constructor(UID){
	this.waypoints = [];
	this.controlPoints = [];
	this.curves = [];
	this.distances=[];
	this.t = 0;
	this.c = 0;
	this.prevPoint = {x:0,y:0};
	this.angle = 0;
	this.UID = UID;
	}
	addWaypoint(x,y){
		this.waypoints.push({x:x,y:y});
	}
	generatePath(curveFactor=0.3) {
		if (this.waypoints.length<2){
			console.log("generatePath() error: count waypoints < 2")
			return
		}
	  this.waypoints.forEach((waypoint, i) => {
		const prevDist = i>0? m.getDistance(waypoint.x, waypoint.y, this.waypoints[i-1].x, this.waypoints[i-1].y):0;
		const nextDist = i<this.waypoints.length-1? m.getDistance(waypoint.x, waypoint.y, this.waypoints[i+1].x, this.waypoints[i+1].y):0;
		const angle = i>0&&i<this.waypoints.length-1? m.getAngle(this.waypoints[i-1].x, this.waypoints[i-1].y, this.waypoints[i+1].x, this.waypoints[i+1].y):0;
		this.controlPoints.push({
		  x: waypoint.x - Math.cos(angle) * prevDist * curveFactor,
		  y: waypoint.y - Math.sin(angle) * prevDist * curveFactor
		});
		this.controlPoints.push({
		  x: waypoint.x + Math.cos(angle) * nextDist * curveFactor,
		  y: waypoint.y + Math.sin(angle) * nextDist * curveFactor
		});
	  });
		for (let i=0;i<this.waypoints.length-1;i++){
			this.curves.push(new Bezier(this.waypoints[i],this.controlPoints[i*2+1],this.controlPoints[i*2+2],this.waypoints[i+1]));
		};//fill curves
		this.curves.forEach((e)=>{
			this.distances.push(e.length())
		})
		this.prevPoint = this.waypoints[0];
	}
	move(speed=800){
		this.t+=rt.dt/this.distances[this.c]*speed*cubicFunction(this.t);
		if (this.t>1){
			if(this.c==this.waypoints.length-2){
				c3_callFunction("pfbzStop",[this.UID]);
				const ret = this.curves[this.c].get(this.t);
				this.angle = m.getAngle(this.prevPoint.x,this.prevPoint.y,ret.x,ret.y);
				this.prevPoint={x:ret.x,y:ret.y}
				return ret
				
			}
			this.c+=1;
			this.t-=1;
		}
		const ret = this.curves[this.c].get(this.t);
		this.angle = m.getAngle(this.prevPoint.x,this.prevPoint.y,ret.x,ret.y);
		this.prevPoint={x:ret.x,y:ret.y}
		return ret
	}

	debug(){
		console.log(this);
	}
}

function cubicFunction(x) {
  return (x*2-1)**2+1
}

function filterBy(param, value, iterable){
	return iterable.filter(obj => obj.instVars[param] == value);
}
