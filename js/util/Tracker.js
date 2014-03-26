var Tracker = {
	track:function(__category, __action, __label){
		ga("send", "event", __category, !__action ? " action " : __action, !__label ? " " : __label);
	}
}