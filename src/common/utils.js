import Vue from 'vue'
/**
 *
 * filters: {
    showDate: function (value) {
      const date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
/**
 *
 * @param {String} path 请求路径
 * @param {Number} id 删除ID
 * @param {Function} cb 回调
 */
export async function removeById(path, id, cb) {
  const confirmResult = await Vue.prototype
    .$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .catch(err => err)

  if (confirmResult !== 'confirm') {
    return Vue.prototype.$message.info('已取消删除！')
  }
  const { data: res } = await Vue.prototype.$http.delete(`${path}/${id}`)
  if (res.meta.status !== 200) {
    return Vue.prototype.$message.error('删除失败')
  }
  Vue.prototype.$message.success('删除成功')
  cb()
}
