import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {cutTag} from '@/redux/actions/tags'
import {Tag} from 'antd';
import {Consumer} from "@/view/Layout/Tags";

const TagList = (props) => {
    const {title, path} = props;

    const handleClose = (path, router) => {

        const {cutTag, tagList} = props;
        const length = tagList.length
        const currentPath = router.location.pathname
        // 如果关闭的是当前页，跳转到最后一个tag
        if (path === currentPath) {
            router.push(tagList[length - 1].path)
        }
        //  // 如果关闭的是最后的tag ,且当前显示的也是最后的tag对应的页面，才做路由跳转
        if (path === tagList[length - 1].path && currentPath === tagList[length - 1].path) {
            // 因为cutTaglist在最后执行，所以跳转到上一个tags的对应的路由，应该-2
            if (length - 2 > 0) {
                router.push(tagList[length - 2].path)
            } else if (length === 2) {
                router.push(tagList[0].path)
            }
        }
        cutTag(path)

    }

    const handleClick = (path, router, event) => {
        //切换路由
        if (event.target.tagName === 'I' || router.location.pathname === path) return
        router.push(path)
    }

    return (
        <Consumer>
            {(router) => {
                return (
                    <Tag
                        onClose={() => {
                           return handleClose(path, router)
                        }}
                        closable
                        color={router.location.pathname === path ? 'geekblue' : 'gold'}
                        onClick={e => handleClick(path, router, e)}
                    >{title}</Tag>
                )
            }}
        </Consumer>
    )
}

const mapStateToProps = state => ({tagList: state.tags.tagList})
const mapDispatchToProps = dispatch => ({
    cutTag: (playload) => {
        dispatch(cutTag(playload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TagList)
