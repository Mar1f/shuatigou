package com.mar.shuatigou.model.vo;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mar.shuatigou.model.entity.Question;
import com.mar.shuatigou.model.entity.QuestionBank;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 题库视图
 *
 */
@Data
public class QuestionBankVO implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 标题
     */
    private String title;

    /**
     * 描述
     */
    private String description;
    /**
     * 审核人 id
     */
    private Long reviewerId;

    /**
     * 审核时间
     */
    private Date reviewTime;
    /**
     * 图片
     */
    private String picture;
    /**
     * 创建用户 id
     */
    private Long userId;

    /**
     * 浏览量
     */
    private Integer viewNum;
    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 标签列表
     */
    private List<String> tagList;

    /**
     * 创建用户信息
     */
    private UserVO user;

    /**
     * 题库里的题目分页
     */
    Page<QuestionVO> questionPage;
    /**
     * 封装类转对象
     *
     * @param questionBankVO
     * @return
     */
    public static QuestionBank voToObj(QuestionBankVO questionBankVO) {
        if (questionBankVO == null) {
            return null;
        }
        QuestionBank questionBank = new QuestionBank();
        BeanUtils.copyProperties(questionBankVO, questionBank);
        return questionBank;
    }

    /**
     * 对象转封装类
     *
     * @param questionBank
     * @return
     */
    public static QuestionBankVO objToVo(QuestionBank questionBank) {
        if (questionBank == null) {
            return null;
        }
        QuestionBankVO questionBankVO = new QuestionBankVO();
        BeanUtils.copyProperties(questionBank, questionBankVO);
        return questionBankVO;
    }
}
