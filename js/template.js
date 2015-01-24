/**
 * Created by wm on 23.12.14.
 */
var Template = function(id) {
    if (id.substr(0,8) === "@inline:") {
        this.tpl = id.substr(8);
    } else {
        this.$tpl = $("#"+id);
        this.tpl = this.$tpl.html();
        this.missing = "";
    }
    this.render = function(data){
        var that = this,
            regexp = new RegExp("\{(.*?)\}", "g"),
            str = this.tpl;
        return str.replace(regexp, function (val) {
            var key = val.substr(1, val.length - 2),
                missing = (that.missing === false) ? val : that.missing;
            return data[key] || missing;
        });
    };
};