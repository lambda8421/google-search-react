import React from 'react'

class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            relatedWords:[],
            searchWord:'',
            index:-1
        }
    }

    handleChange=(e)=>{
        let searchWord = e.target.value;
        let words = ['a','b','c','aa','bb','cc']
        let relatedWords = words.filter((item)=>item.includes(searchWord))
        this.setState({searchWord,relatedWords})
    }
    handleKeyDown = (e)=>{
        let code = e.keyCode
        /*
            38 key Down
            40 key Up
         */
        //https://www.google.com/search?ei=b2rdWq3lOaO7jwTJpq6QCw&q=react&oq=react&gs_l=psy-ab.3..35i39k1l2j0i67k1l2j0l3j0i131k1j0i20i264k1j0.2139.3098.0.3225.5.5.0.0.0.0.175.469.4j1.5.0....0...1c.1.64.psy-ab..0.5.469...0i131i20i264k1j0i131i67k1.0.B8wdwjI2Q_g
        if(code === 38 || code === 40){
            let index = this.state.index
            index = (code === 38 ? index -1 : index + 1)
            index = index === this.state.relatedWords.length ? -1 : index
            index = index < -1 ? this.state.relatedWords.length-1 : index
            this.setState({index})
        }else if(code === 13){
            //search
            window.location = `https://www.google.com/search?q=${e.target.value}`
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <input onChange={this.handleChange}
                                       onKeyDown={this.handleKeyDown}
                                       value={this.state.index > 0 ?this.state.relatedWords[this.state.index]:this.state.searchWord}
                                       type="text"
                                       className="form-control"/>
                            </div>
                            <div className="panel-body">
                                <ul className="list-group">
                                    {
                                        this.state.relatedWords.map(
                                            (item,index)=>(
                                                <li
                                                    key={index}
                                                    className={`list-group-item ${index===this.state.index ? "active":""}`}>{item}
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Suggest