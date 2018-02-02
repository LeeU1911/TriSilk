package com.dinogroup.web.rest;

import com.dinogroup.TriSilkApp;

import com.dinogroup.domain.MaSanPham;
import com.dinogroup.repository.MaSanPhamRepository;
import com.dinogroup.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.dinogroup.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MaSanPhamResource REST controller.
 *
 * @see MaSanPhamResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TriSilkApp.class)
public class MaSanPhamResourceIntTest {

    private static final String DEFAULT_PRODUCT_ID = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCT_ID = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private MaSanPhamRepository maSanPhamRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMaSanPhamMockMvc;

    private MaSanPham maSanPham;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaSanPhamResource maSanPhamResource = new MaSanPhamResource(maSanPhamRepository);
        this.restMaSanPhamMockMvc = MockMvcBuilders.standaloneSetup(maSanPhamResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MaSanPham createEntity(EntityManager em) {
        MaSanPham maSanPham = new MaSanPham()
            .productId(DEFAULT_PRODUCT_ID)
            .createdDate(DEFAULT_CREATED_DATE);
        return maSanPham;
    }

    @Before
    public void initTest() {
        maSanPham = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaSanPham() throws Exception {
        int databaseSizeBeforeCreate = maSanPhamRepository.findAll().size();

        // Create the MaSanPham
        restMaSanPhamMockMvc.perform(post("/api/ma-san-phams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maSanPham)))
            .andExpect(status().isCreated());

        // Validate the MaSanPham in the database
        List<MaSanPham> maSanPhamList = maSanPhamRepository.findAll();
        assertThat(maSanPhamList).hasSize(databaseSizeBeforeCreate + 1);
        MaSanPham testMaSanPham = maSanPhamList.get(maSanPhamList.size() - 1);
        assertThat(testMaSanPham.getProductId()).isEqualTo(DEFAULT_PRODUCT_ID);
        assertThat(testMaSanPham.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createMaSanPhamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = maSanPhamRepository.findAll().size();

        // Create the MaSanPham with an existing ID
        maSanPham.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaSanPhamMockMvc.perform(post("/api/ma-san-phams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maSanPham)))
            .andExpect(status().isBadRequest());

        // Validate the MaSanPham in the database
        List<MaSanPham> maSanPhamList = maSanPhamRepository.findAll();
        assertThat(maSanPhamList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMaSanPhams() throws Exception {
        // Initialize the database
        maSanPhamRepository.saveAndFlush(maSanPham);

        // Get all the maSanPhamList
        restMaSanPhamMockMvc.perform(get("/api/ma-san-phams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(maSanPham.getId().intValue())))
            .andExpect(jsonPath("$.[*].productId").value(hasItem(DEFAULT_PRODUCT_ID.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }

    @Test
    @Transactional
    public void getMaSanPham() throws Exception {
        // Initialize the database
        maSanPhamRepository.saveAndFlush(maSanPham);

        // Get the maSanPham
        restMaSanPhamMockMvc.perform(get("/api/ma-san-phams/{id}", maSanPham.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(maSanPham.getId().intValue()))
            .andExpect(jsonPath("$.productId").value(DEFAULT_PRODUCT_ID.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaSanPham() throws Exception {
        // Get the maSanPham
        restMaSanPhamMockMvc.perform(get("/api/ma-san-phams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaSanPham() throws Exception {
        // Initialize the database
        maSanPhamRepository.saveAndFlush(maSanPham);
        int databaseSizeBeforeUpdate = maSanPhamRepository.findAll().size();

        // Update the maSanPham
        MaSanPham updatedMaSanPham = maSanPhamRepository.findOne(maSanPham.getId());
        // Disconnect from session so that the updates on updatedMaSanPham are not directly saved in db
        em.detach(updatedMaSanPham);
        updatedMaSanPham
            .productId(UPDATED_PRODUCT_ID)
            .createdDate(UPDATED_CREATED_DATE);

        restMaSanPhamMockMvc.perform(put("/api/ma-san-phams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaSanPham)))
            .andExpect(status().isOk());

        // Validate the MaSanPham in the database
        List<MaSanPham> maSanPhamList = maSanPhamRepository.findAll();
        assertThat(maSanPhamList).hasSize(databaseSizeBeforeUpdate);
        MaSanPham testMaSanPham = maSanPhamList.get(maSanPhamList.size() - 1);
        assertThat(testMaSanPham.getProductId()).isEqualTo(UPDATED_PRODUCT_ID);
        assertThat(testMaSanPham.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingMaSanPham() throws Exception {
        int databaseSizeBeforeUpdate = maSanPhamRepository.findAll().size();

        // Create the MaSanPham

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMaSanPhamMockMvc.perform(put("/api/ma-san-phams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maSanPham)))
            .andExpect(status().isCreated());

        // Validate the MaSanPham in the database
        List<MaSanPham> maSanPhamList = maSanPhamRepository.findAll();
        assertThat(maSanPhamList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMaSanPham() throws Exception {
        // Initialize the database
        maSanPhamRepository.saveAndFlush(maSanPham);
        int databaseSizeBeforeDelete = maSanPhamRepository.findAll().size();

        // Get the maSanPham
        restMaSanPhamMockMvc.perform(delete("/api/ma-san-phams/{id}", maSanPham.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MaSanPham> maSanPhamList = maSanPhamRepository.findAll();
        assertThat(maSanPhamList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaSanPham.class);
        MaSanPham maSanPham1 = new MaSanPham();
        maSanPham1.setId(1L);
        MaSanPham maSanPham2 = new MaSanPham();
        maSanPham2.setId(maSanPham1.getId());
        assertThat(maSanPham1).isEqualTo(maSanPham2);
        maSanPham2.setId(2L);
        assertThat(maSanPham1).isNotEqualTo(maSanPham2);
        maSanPham1.setId(null);
        assertThat(maSanPham1).isNotEqualTo(maSanPham2);
    }
}
