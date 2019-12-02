<template>
  <div class="r-container infant">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增食谱</span>
        <span class="float-right">
          <el-button type="primary" @click="$router.go(-1)">返回</el-button>
        </span>
      </div>
      <el-form ref="search" :model="search" :inline="true" label-width="100px" size="small">
        <el-form-item label="食谱名称" prop="todo1">
          <el-input v-model="search.todo1" type="text" />
        </el-form-item>
        <el-form-item label="食谱有效日期" prop="todo2">
          <!--  <el-date-picker v-model="search.todo2" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" >
          </el-date-picker>-->
          <el-date-picker
            v-model="search.todo2"
            type="week"
            format="yyyy-MM  第 WW 周"
            placeholder="选择周"
            :picker-options="pickerOptions"
            clear-icon
            @change="change"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">复制食谱</el-button>
        </el-form-item>
      </el-form>
      <p>温馨提示：1、添加食谱时鼠标移入餐次名称可修改和删除餐次（餐次最多8个） 2、某餐段下没有食谱可以不填。</p>
      <el-tabs v-model="activeTab" type="border-card" :stretch="true">
        <el-tab-pane v-for="(day,index) in week" :key="index">
          <span slot="label">
            {{ day }}
            <br />
            {{ dates[index] }}
          </span>
          <el-table
            :data="menu[index]"
            style="width: 100%;"
            border
            :span-method="cellMerge"
            :header-cell-style="{'text-align':'center','background-color':'#F2F3F5','border-right':'none'}"
            :cell-class-name="cellClass"
          >
            <el-table-column prop="dinner" label="餐次" width="135">
              <template slot-scope="scope">
                <div @mouseenter="hover = scope.$index">{{ scope.row.dinner }}</div>
                <div v-show="hover === scope.$index" class="cover" @mouseleave="hover = -1">
                  <div>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="showDialog(scope.$index,'edit')"
                    >修改</el-button>
                  </div>
                  <div>
                    <el-button size="mini" type="primary" @click="showDialog(scope.$index,'add')">添加</el-button>
                  </div>
                  <div>
                    <el-button size="mini" type="warning" @click="delDinner(scope.$index)">删除</el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="dish" label="菜肴">
              <template slot-scope="{row}">
                <el-input v-model="row.dish" type="textarea" />
              </template>
            </el-table-column>
            <el-table-column label="配图" width="256">
              <template>
                <el-row>
                  <!--  <draggable v-model="attach[activeTab]">
                     <transition-group>
                    <el-col :span="12" v-for="(img,index) in attach[activeTab]" :key="index">
                      <div class="imgBlock">
                        <el-image style="width: 110px; height: 110px" :src="img" fit="fit" :preview-src-list="[img]"></el-image>
                        <span class="delImg" @click="delImg(index)">X</span>
                      </div>
                    </el-col>
                   </transition-group>
                  </draggable>-->
                  <el-col
                    v-for="(img,index) in attach[activeTab]"
                    :key="index"
                    v-dragging="{ item: img, list: attach[activeTab], group: 'imgs' }"
                    :span="12"
                  >
                    <div class="imgBlock">
                      <el-image
                        style="width: 110px; height: 110px"
                        :src="img"
                        fit="fit"
                        :preview-src-list="[img]"
                      />
                      <span class="delImg" @click="delImg(index)">X</span>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <el-upload
                      action="http://zh-dev.7kid.com/web/index.php?c=utility&a=file&do=local&page=1&year=0&month=0"
                      :show-file-list="false"
                      list-type="picture-card"
                      multiple
                      :on-success="imgUpload"
                      :file-list="fileList"
                    >
                      <i class="el-icon-plus" />
                    </el-upload>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="680px">
      <el-form :model="dialog" style="padding: 30px 50px 10px;">
        <el-form-item
          prop="dinner"
          label="餐 次"
          label-width="55px"
          :rules="[{ required: true, message: '请输入餐次名称', trigger: 'blur'}]"
        >
          <el-input v-model="dialog.dinner" placeholder="请输入餐次名称" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialog.visible = false">取 消</el-button>
        <el-button v-if="dialog.type === 'add'" size="small" type="primary" @click="addDinner">确 定</el-button>
        <el-button
          v-else-if="dialog.type === 'edit'"
          size="small"
          type="primary"
          @click="editDinner"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    />
  </div>
</template>
<script>
export default {
	data() {
		return {
			activeTab: 0,
			hover: -1,
			dialog: {
				visible: false,
				title: '',
				dinner: '',
				index: -1,
				type: ''
			},
			fileList: [],
			search: {
				todo1: '',
				todo2: new Date()
			},
			week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			dates: [],
			menu: [
				[
					{
						dinner: '早餐',
						dish: '牛奶番茄鸡蛋'
					},
					{
						dinner: '午餐',
						dish: '牛奶番茄鸡蛋'
					},
					{
						dinner: '点心',
						dish: '酸菜鱼番茄鸡蛋'
					},
					{
						dinner: '晚餐',
						dish: '酸菜鱼番茄鸡蛋'
					}
				],
				[],
				[],
				[],
				[],
				[],
				[]
			],
			attach: [
				[
					'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
					// 'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					// 'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					// 'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					// 'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					// 'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					// 'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					// 'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					// 'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg',
					'http://resource-zh-ts.7kid.com//images//2019/07/BEd8ft3cBF7b6lhdrrzffB18TBpuS6.jpg'
				],
				[],
				[],
				[],
				[],
				[],
				[]
			],
			pickerOptions: {
				firstDayOfWeek: 1
			},
			restaurants: ['鱼香肉丝', '番茄炒蛋', '青菜豆腐'],
			state: ''
		};
	},
	mounted() {
		this.dates = this.setDate(new Date());
	},
	methods: {
		showDialog(index, type) {
			this.dialog.index = index;
			this.dialog.type = type;
			this.dialog.title =
				this.dates[this.activeTab] +
				'(' +
				this.week[this.activeTab] +
				') - 餐次' +
				(type === 'add' ? '添加' : '修改');
			this.dialog.dinner =
				type === 'edit' ? this.menu[this.activeTab][index].dinner : '';
			this.dialog.visible = true;
		},
		editDinner(form) {
			if (!this.dialog.dinner) {
				return false;
			}
			this.menu[this.activeTab][this.dialog.index].dinner = this.dialog.dinner;
			this.dialog.visible = false;
		},
		addDinner() {
			if (!this.dialog.dinner) {
				return false;
			}
			this.menu[this.activeTab].splice(this.dialog.index, 0, {
				dinner: this.dialog.dinner,
				dish: ''
			});
			this.dialog.visible = false;
		},
		delDinner(index) {
			this.menu[this.activeTab].splice(index, 1);
		},
		change(val) {
			this.dates = this.setDate(new Date(val));
		},
		setDate(date) {
			var dates = [];
			var monday = GetMonday(date);
			for (let i = 0; i < 7; i++) {
				dates.push(formatDate(addDay(monday, i)));
			}
			return dates;
			function GetMonday(dd) {
				var week = dd.getDay(); // 获取时间的星期数
				var minus = week ? week - 1 : 6;
				dd.setDate(dd.getDate() - minus); // 获取minus天前的日期
				return dd;
			}
			function addDay(date, day) {
				var dd = new Date(date);
				dd.setDate(dd.getDate() + day);
				return dd;
			}
			function formatDate(date) {
				// var y = date.getFullYear();
				var m = date.getMonth() + 1;
				var d = date.getDate();
				m = m < 10 ? '0' + m : m;
				d = d < 10 ? '0' + d : d;
				// return y + '-' + m + '-' + d
				return m + '.' + d;
			}
		},
		cellMerge({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 2) {
				return {
					rowspan: this.menu[this.activeTab].length,
					colspan: 1
				};
			}
		},
		cellClass({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 2 && rowIndex === 0) {
				return 'comCol mergeCol';
			} else if (columnIndex === 2 && rowIndex !== 0) {
				return 'comCol _mergeCol';
			} else {
				return 'comCol';
			}
		},
		handleRemove(file) {
			console.log(file);
		},
		imgUpload(response, file, fileList) {
			console.log(file);
			// this.attach[this.activeTab].push('')
		},
		delImg(img, index) {
			this.attach[this.activeTab].splice(index, 1);
		},
		querySearchAsync(queryString, cb) {
			var restaurants = this.restaurants;
			var results = queryString
				? restaurants.filter(this.createStateFilter(queryString))
				: '';
			cb(results);
		},
		createStateFilter(queryString) {
			return state => {
				return state.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
			};
		},
		handleSelect(item) {
			console.log(item);
		}
	}
};
</script>
<style lang="scss" scoped>
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #fff;
  background-color: #41cac0;
}
/deep/
  .el-tabs--top.el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:nth-child(2) {
  padding-left: 0;
}
/deep/
  .el-tabs--top.el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:last-child {
  padding-right: 0;
}
/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  height: 60px;
  line-height: 24px;
  padding: 5px;
}
/deep/ .el-textarea__inner {
  height: 76px;
}
/deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff;
}

/deep/ .el-upload--picture-card {
  width: 110px;
  height: 110px;
  line-height: 120px;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 110px;
  height: 110px;
}
/deep/ .el-dialog {
  border: 6px;
  overflow: hidden;
  .el-dialog__header {
    padding: 2px 20px;
    background: #d7dde4;
    .el-dialog__title {
      font-weight: 400;
      color: #333;
      font-size: 14px;
    }
    .el-dialog__headerbtn {
      top: 6px;
    }
  }
  .dialog-footer {
    text-align: center;
  }
}

/deep/ .mergeCol {
  vertical-align: baseline;
  min-height: 400px;
  .cell {
    vertical-align: baseline;
  }
}
/deep/ ._mergeCol {
  .cell {
    height: 0;
  }
}
/deep/ .comCol {
  .cell {
    text-align: center;
  }
}
.imgBlock {
  position: relative;
}
.delImg {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #41cac0;
  border-radius: 50%;
  font-size: 12px;
  top: 0;
  right: 0;
  z-index: 1;
  color: #fff;
  line-height: 18px;
  cursor: pointer;
}
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  font-size: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 2% 0;
}
</style>
