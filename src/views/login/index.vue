<template>
	<div class="login-container">
		<span class="top-img"><img src="@/assets/img/login_pic_a@2x.png" alt=""></span>
		<span class="bottom-img"><img src="@/assets/img/login_pic_b@2x.png" alt=""></span>
	<div class="login-con">
		<span class="middle-img"><img src="@/assets/img/login_pic_c@2x.png" alt=""></span>
		<el-form
			ref="loginForm"
			:model="loginForm"
			:rules="loginRules"
			class="login-form"
			auto-complete="on"
			label-position="left"
		>
			<div class="title-container">
				<span class="title"><img src="@/assets/img/login_7kid_logo@2x.png" alt=""></span>
			</div>

			<el-form-item prop="account">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input
					ref="account"
					v-model="loginForm.account"
					placeholder="请输入账号"
					name="account"
					type="text"
					tabindex="1"
					auto-complete="on"
				/>
			</el-form-item>

			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input
					:key="passwordType"
					ref="password"
					v-model="loginForm.password"
					:type="passwordType"
					placeholder="Password"
					name="password"
					tabindex="2"
					auto-complete="on"
					@keyup.enter.native="handleLogin"
				/>
				<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
				</span>
			</el-form-item>

			<el-button
				:loading="loading"
				type="primary"
				style="width:100%;margin-bottom:30px;"
				@click.native.prevent="handleLogin"
				round
			>登  录</el-button>
		</el-form>

	</div>
	<el-dialog title="请选择学校" :visible.sync="chooseSchool" width="30%" class="default-dialog" center>
	<el-radio-group v-model="schoolId">
		<el-radio v-for="school in schoolList" :label="school.id">{{school.title}}</el-radio>
	</el-radio-group>
	<span slot="footer" class="dialog-footer">
		<el-button @click="chooseSchool = false">取 消</el-button>
		<el-button type="primary" @click="chooseResult">确 定</el-button>
	</span>
	</el-dialog>
	</div>
</template>

<script>
import { getTemporaryToken, getSchoolId } from '@/api/user'
import { validUsername } from '@/utils/validate';

export default {
	name: 'Login',
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!validUsername(value)) {
				callback(new Error('Please enter the correct user name'));
			} else {
				callback();
			}
		};
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('The password can not be less than 6 digits'));
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				account: '18458086165',
				password: '123456',
				loginType: '1',
				clientType: 'web',
				params: {
					commonLoginBusiness: '7kid'
				}
			},
			loginRules: {
				account: [
					{ required: true, trigger: 'blur', validator: validateUsername }
				],
				password: [
					{ required: true, trigger: 'blur', validator: validatePassword }
				]
			},
			loading: false,
			passwordType: 'password',
			redirect: undefined,
			temptoken: undefined,
			schoolList: [],
			schoolId: '',
			chooseSchool: false,
		};
	},
	watch: {
		$route: {
			handler: function(route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true
		}
	},
	methods: {
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = '';
			} else {
				this.passwordType = 'password';
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		handleLogin() {
		 	this.$refs.loginForm.validate(async valid => {
				if (valid) {
					this.temptoken = await getTemporaryToken(this.loginForm);
					const {preferId,school}  = await getSchoolId({}, {
						headers: {
							'Authorization': 'Bearer ' + this.temptoken
						}
					});
					this.schoolId = preferId;
					this.schoolList = school;
					this.chooseSchool = true;
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		chooseResult() {
			this.loading = true;
			this.$store
			.dispatch('user/login', {temptoken: this.temptoken,schoolId: this.schoolId})
			.then(() => {
				this.$router.push({ path: this.redirect || '/' });
				this.loading = false;
			})
			.catch(() => {
				this.loading = false;
			});
		}
	}
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #EFFDFA;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	min-height: 100%;
	width: 100%;
	min-width:1200px;
	background-color: $bg;
	overflow: hidden;
	.top-img{
		position:absolute;
		left:0;
		top:0;
		width:28%;
		min-width:276px;
		img{
			width:100%;
		}

	}

	.bottom-img{
		position:absolute;
		right:0;
		bottom:0;
		width:25%;
		min-width:240px;
		img{
			width:100%;
		}
	}
	.login-con{
		position:absolute;
		width:80%;
		min-width:1050px;
		height:50%;
		left:15%;
		top:30%;
		.middle-img{
			float: left;
			margin-top:-100px;
			width:44%;
			min-width:370px;
			img{
				width:100%;
			}
		}
	}
	.login-form {
		float: left;
		position: relative;
		width: 30%;
		min-width:300px;
		height: 70%;
		min-height:300px;
		max-width: 100%;
		padding: 0 35px 0;
		border-radius:30px;
		background:#ffffff;
		margin-left:100px;
		box-shadow: -10px 10px 20px rgba(0, 0, 0,0.1);
		/deep/ input{
			color:#333333;
		}
		/deep/ .el-button--primary{
			background-image: linear-gradient(to right, #79DABD , #4CD7EC);
			border:none;
		}
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: #3BD29F;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;
		height:130px;
		margin-bottom:-50px;
		.title {
			position:absolute;
			width:30%;
			max-width:130px;
			left:50%;
			margin-left:-15%;
			margin-top:-15%;
			border-radius:50%;
			box-shadow:-10px 10px 10px rgba(0, 0, 0,0.1);
			img{
				width:100%;
			}
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
