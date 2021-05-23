import React, {Component} from "react"
import {observer} from "mobx-react"
import {makeObservable, observable} from "mobx"
import "../../res/css/UI/Toast.css"
class ToastObject {
	constructor(text, time, type, deleteCallback) {
		this.text=text
		this.time=time
		this.type=type
		this.startTime=Date.now()
		this.removed=false
		this.deleteCallback=deleteCallback
		this.fresh=true
		setTimeout(()=>this.fresh=false, 300)
		setTimeout(this.dismiss, time*1000)
		makeObservable(this, {
			removed:observable,
			fresh:observable
		})
	}
	dismiss=()=>{
		this.removed=true
		setTimeout(this.dismissFinal, 500)
	}
	dismissFinal=()=>{
		this.deleteCallback(this)
	}
}
class ToastManager {
	_toasts=[]
	constructor(){
		makeObservable(this, {
			_toasts:observable
		})
	}
	push=(text, time=10, type="")=>{
		const newToast=new ToastObject(text, time, type, this.dismiss)
		this._toasts.unshift(newToast)
		return newToast
	}
	dismiss=(toast)=>{
		const index=this._toasts.indexOf(toast)
		if(index>=0)
			this._toasts.splice(index, 1)
	}

}
const instance=new ToastManager()

const ToastWindow=observer(class ToastWindow extends Component {
	dismiss=()=>{
		this.props.toast.dismiss()
		this.forceUpdate()
	}
	render() {
		return (
			<div
				className={"toastWindow "+(this.props.toast.type?"toastWindow"+this.props.toast.type:"") + (this.props.toast.removed || this.props.toast.fresh?" toastWindowRemoved ":"")}
				onClick={this.dismiss}
			>
				<h3>{this.props.toast.text}</h3>
			</div>
		)
	}
})

const ToastController = observer(class ToastController extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toasts:[]
		}
	}

	componentDidMount = () => {
		this._isMounted = true
	}
	componentWillUnmount = () => {
		this._isMounted = false
	}

	render() {
		return (
			<div className={"toast"}
			style={{
				height:instance._toasts.reduce((acc, v)=>{return acc + ((v.fresh||v.removed)?0:60)}, 0)
			}}>
				{instance._toasts.map(toast=>{
					return <ToastWindow
						toast={toast}
						key={toast.startTime}
					/>
				})}
			</div>
		)
	}
})

export default instance
export {ToastController}