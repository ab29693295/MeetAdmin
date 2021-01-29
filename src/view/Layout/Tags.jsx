import React, {Component} from "react";
import {addTags} from '@/redux/actions/tags'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import TagList from '@/components/TagList'
import styles from './css/index.module.css'
export const {Provider,Consumer} = React.createContext();
class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const { addTags } = this.props;
        addTags(this.props.history.location.pathname)
        this.props.history.listen(route => {
            const { addTags } = this.props;
            addTags(route.pathname)
        })
    }
    render(){
        const {tagList} = this.props,
            currentPath = this.props.history.location.pathname
        let router=this.props.history
        return (

            <Provider value={router}>
            <ul className={styles.tagsWrap}>
                {
                    tagList.map(ele=>(
                        <li key={ele.path}>
                            <TagList
                                path={ele.path}
                                selected={ele.path===currentPath?true:false}
                                title={ele.title}
                                router={currentPath}
                            />
                        </li>
                    ))
                }
            </ul>
            </Provider>
        )
    }
}
const mapStateToProps = state => (
    {tagList: state.tags.tagList}
    )
const mapDispatchToProps = dispatch => ({
    addTags: (playload) => {
        dispatch(addTags(playload))
    }
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Tags))
