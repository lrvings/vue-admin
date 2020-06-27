<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="left"></slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name="right"></slot></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>

export default {
  name: 'name'
}

</script>
